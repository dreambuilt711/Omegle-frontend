import React from 'react'
import { Helmet } from 'react-helmet';
import Messages from '../components/Chat/Messages';
import MessageInput from '../components/Chat/MessageInput';
import { useChat } from '../contextApi/ChatContext';
import styled from 'styled-components';

const Chat = () => {
    const { receiver } = useChat()

    return (
        <>
            {receiver?.socketId ?
                <Helmet>
                    <title>Omegle: Connected to {receiver.username}</title>
                </Helmet> :
                <Helmet>
                    <title>Omegle: Talk to strangers!</title>
                </Helmet>
            }
            <MessageWrapper>
                <Messages />
                <MessageInput />
            </MessageWrapper>
        </>

    )
}

export default Chat

const MessageWrapper = styled.div({
    width:"100%",
    height: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
})