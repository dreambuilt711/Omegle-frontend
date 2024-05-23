import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const [chatType, setChatType] = useState(0);
    const [interests, setInterests] = useState('');
    const [isSearching, setIsSearching] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [receiver, setReceiver] = useState(null);
    const [caller, setCaller] = useState();
    const [isTyping, setIsTyping] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");
    const [signal, setSignal] = useState();
    return (
        <>
            <ChatContext.Provider
                value={{
                    user,
                    setUser,
                    userId,
                    setUserId,
                    chatType,
                    setChatType,
                    interests,
                    setInterests,
                    messages,
                    setMessages,
                    onlineUsers,
                    setOnlineUsers,
                    isConnected,
                    setIsConnected,
                    receiver,
                    setReceiver,
                    caller,
                    setCaller,
                    isSearching,
                    setIsSearching,
                    isTyping,
                    setIsTyping,
                    isSending,
                    setIsSending,
                    message,
                    setMessage,
                    signal,
                    setSignal
                }}
            >
                {children}
            </ChatContext.Provider>
        </>
    );
};

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

const useChat = () => useContext(ChatContext);

export {
    ChatContext,
    ChatContextProvider,
    useChat
}