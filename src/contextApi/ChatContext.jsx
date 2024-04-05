import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [userId, setUserId] = useState();
    const [chatType, setChatType] = useState(0);
    const [isSearching, setIsSearching] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [receiver, setReceiver] = useState();
    const [isTyping, setIsTyping] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState("");
    const [userStream, setUserStream] = useState(null);

    return (
        <>
            <ChatContext.Provider
                value={{
                    chatType,
                    setChatType,
                    userId,
                    setUserId,
                    messages,
                    setMessages,
                    onlineUsers,
                    setOnlineUsers,
                    isConnected,
                    setIsConnected,
                    receiver,
                    setReceiver,
                    isSearching,
                    setIsSearching,
                    isTyping,
                    setIsTyping,
                    isSending,
                    setIsSending,
                    message,
                    setMessage,
                    userStream,
                    setUserStream
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