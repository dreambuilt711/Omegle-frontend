import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useChat } from './contextApi/ChatContext';
// import beepSound from "./assets/ping-82822.mp3"

const URL = process.env.REACT_APP_BASE_URL

export const socket = io(URL, {
    autoConnect: false,
    reconnectionAttempts: 3
});

const Socket = () => {
    const { setUserId, setIsConnected, setMessages, setOnlineUsers, setReceiver, setIsSearching, setIsTyping, setMessage, setIsSending, setCaller, setSignal } = useChat()

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
            setReceiver(receiver)
            setCaller(type)
            setIsSearching(false)
        })
        socket.on('get-video-stream', (signal) => {
            setSignal(signal)
        });
        socket.on("chat-close", () => {
            setReceiver("")
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