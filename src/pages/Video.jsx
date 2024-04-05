import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import { useChat } from "../contextApi/ChatContext"
import Messages from "../components/Chat/Messages"
import MessageInput from "../components/Chat/MessageInput"
import Peer from "simple-peer"
import { socket } from '../Socket';

const Video = () => {
    const { receiver, userStream } = useChat()
    const myVideo = useRef(null)
    const userVideo = useRef(null)
    const connectionRef = useRef();
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
        // const my_peer = new Peer({ initiator: false, trickle: false, stream });
        // my_peer.on('stream', (currentStream) => {

        // })
    }, [stream])
    useEffect(() => {
        if ( receiver && stream ) {
            const peer = new Peer({ initiator: false, trickle: false, stream });
            peer.on('signal', (data) => {
                socket.emit('callUser', { signal: data, to: receiver });
            });
        }
    },[receiver])
    useEffect(() => {
        const peer = new Peer({ initiator: false, trickle: false, stream});
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })
        peer.signal(userStream);
    },[userStream])
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
                    <Camera ref={userVideo}></Camera>
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