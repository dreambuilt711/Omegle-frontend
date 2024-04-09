import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useChat } from './contextApi/ChatContext';
import { apiUrl } from './constant/constant';
import { toast } from 'react-toastify';

export const socket = io(apiUrl, {
    autoConnect: false,
    reconnectionAttempts: 3
});

const Socket = () => {
    const { user, setUserId, setIsConnected, setMessages, setOnlineUsers, setReceiver, setIsSearching, setIsTyping, setMessage, setIsSending, setCaller, setSignal } = useChat()

    useEffect(() => {
        socket.connect();
        console.log("socket connected");
        return () => {
            socket.disconnect();
            console.log("socket disconnected");
        };
    }, []);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [setIsConnected]);

    useEffect(() => {
        if(user) {
            socket.emit("new-online-user", user._id, (error) => {
                if (error) {
                    return toast.warn(error)
                }
            })
        }
    },[user]);

    useEffect(() => {
        socket.on('get-user-id', (_id) => {
            setUserId(_id);
        })
        socket.on("get-online-users", (users) => {
            setOnlineUsers(users);
        });

        socket.on("send-message", (message) => {
            setMessages((previous) => [
                ...previous,
                { stranger: message },
            ]);
            setIsTyping(false)
        });

        socket.on("receive-message", (message) => {
            setMessages((previous) => [
                ...previous,
                { you: message },
            ]);
            setIsSending(false)
        });

        socket.on("user-paired", (receiver, type) => {
            console.log(JSON.parse(receiver));
            setReceiver(JSON.parse(receiver))
            setCaller(type)
            setIsSearching(false)
        })
        socket.on('get-video-stream', (signal) => {
            setSignal(signal)
        });
        socket.on("chat-close", () => {
            setReceiver(null)
            setMessage("")
            setIsTyping(false)
        })

        socket.on("typing", () => {
            setIsTyping(true)
        })

        socket.on("typing stop", () => {
            setIsTyping(false)
        })


        return () => {
            socket.off("get-online-users");
            socket.off("send-message");
            socket.off("receive-message");
            socket.off("new-online-user");
            socket.off("user-paired")
        };
    }, []);
}

export default Socket