import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import { useChat } from "../contextApi/ChatContext"
import Messages from "../components/Chat/Messages"
import MessageInput from "../components/Chat/MessageInput"

const Video = () => {
    const { receiver } = useChat()
    const myVideo = useRef(null)
    const strangerVideo = useRef(null)
    const [stream, setStream] = useState();
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then((stream) => {
            setStream(stream);
            console.log(stream)
        }).catch((error) => {
            console.log(error)
        })
    },[])
    useEffect(() => {
        myVideo.current.srcObject = stream
    }, [stream])
    return (
        <>
            {receiver && receiver !== "" ?
                <Helmet>
                    <title>Omegle: Connected to stranger</title>
                </Helmet> :
                <Helmet>
                    <title>Omegle: Talk to strangers!</title>
                </Helmet>
            }
            <Wrapper>
                <VideoWrapper>
                    <Camera ref={strangerVideo}></Camera>
                    <Camera ref={myVideo}></Camera>
                </VideoWrapper>
                <MessageWrapper>
                    <Messages />
                    <MessageInput />
                </MessageWrapper>
            </Wrapper>
        </>
    )
}

export default Video

const Camera = styled.video({
    width: "500px"
})

const Wrapper = styled.div({
    display:"flex",
    flexDirection:"row"
});

const VideoWrapper = styled.div({
    display: "flex",
    flexDirection: "column"
})

const MessageWrapper = styled.div({
    width:"100%"
})