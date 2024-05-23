import React, { useEffect } from 'react'
import { useChat } from '../../contextApi/ChatContext';
import { socket } from '../../Socket';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MessageInput = () => {
    const { userId, chatType, interests, onlineUsers, isSearching, setIsSearching, receiver, setReceiver, setMessages, isSending, setIsSending, message, setMessage, setIsTyping } = useChat()

    const newChat = () => {
        setIsSearching(true)
        setMessages([])
        setIsSending(false)
        console.log(interests)
        socket.emit("pairing-user", userId, chatType, interests, (error) => {
            console.log(error);
            return
        })
        return () => {
            socket.off("pairing-user");
        };
    }

    const sendMessage = () => {
        if (isSending) return
        if (message === "") return
        setIsSending(true)
        socket.emit("send-message", receiver?.socketId, message, () => {
            setMessage("")
        })
    }

    const disconnectChat = () => {
        if (receiver?.socketId) {
            socket.emit("chat-close", receiver.socketId, () => {
                setReceiver(null)
                setIsTyping(false)
                setMessage("")
            })
        } else {
            socket.emit("unpairing-user", userId, () => {
                setIsSearching(false)
            })
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    const typingHandle = (e) => {
        if (e.target.value !== "") {
            socket.emit("typing", receiver?.socketId)
        } else {
            socket.emit("typing stop", receiver?.socketId)
        }
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (userId && onlineUsers.find((user) => user._id === userId)) {
            newChat()
        } else {
            navigate("/")
        }
    }, []);

    return (
        <InputWrapper className='messageInputWrapper'>
            {receiver || isSearching ?
                <Button className="stopBtn" onClick={disconnectChat}>
                    Stop
                </Button> :
                <Button className="newBtn" onClick={newChat} disabled={isSearching}>
                    New
                </Button>
            }
            <Input type='text' placeholder='Type  your message...' className='inputBox' onChange={(e) => {
                setMessage(e.target.value)
                typingHandle(e)
            }} value={message} onKeyDown={(e) => handleKeyPress(e)} disabled={!receiver} />
            <SendButton className='sendBtn' onClick={sendMessage}
                disabled={!receiver || isSending}>
                Send
            </SendButton>
        </InputWrapper>
    )
}

export default MessageInput

const InputWrapper = styled.div({
    display: 'flex',
    gap: "5px",
})

const Button = styled.button({
    fontSize: "20px",
    fontWeight: "500",
    minWidth: "fit-content",
    padding: "16px",
    border: "1px solid #CCC",
    borderRadius: "2px"
})

const Input = styled.input({
    fontSize: "18px",
    padding: "16px",
    width: "80%",
    borderRadius: "2px"
})

const SendButton = styled.button({
    fontSize: '20px',
    padding: "16px",
    border: "1px solid #b3aeae",
    borderRadius: "2px"
})