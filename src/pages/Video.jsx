import { useEffect, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import { useChat } from "../contextApi/ChatContext"
import Messages from "../components/Chat/Messages"
import MessageInput from "../components/Chat/MessageInput"
import Peer from "simple-peer"
import { socket } from '../Socket';

const Video = () => {
    const { receiver, caller, signal } = useChat()
    const myVideo = useRef(null)
    const userVideo = useRef(null)
    const connectionRef = useRef()
    const [stream, setStream] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        }).then((stream) => {
            setStream(stream);
        }).catch((error) => {
            console.log(error)
        })
    },[])
    useEffect(() => {
        myVideo.current.srcObject = stream
    }, [stream])
    useEffect(() => {
        if ( signal ) {
            setCallAccepted(true);
            answerCall()
        } else {
            setCallAccepted(false)
        }
    },[signal])
    const callUser = (_id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('callUser', data, _id, (error) => {
                console.log(error)
            });
        });
        peer.on('stream', (currentStream) => {
          userVideo.current.srcObject = currentStream;
        });
        peer.on('close', () => {
            socket.off("callAccepted");
        })
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    };
    const answerCall = () => {
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
          socket.emit('answerCall', { signal: data, to: receiver});
        });
        peer.on('stream', (currentStream) => {
          userVideo.current.srcObject = currentStream;
        });
        peer.on('close', () => {
            socket.off("callAccepted");
        })
        peer.signal(signal);
        connectionRef.current = peer;
    };
    useEffect(() => {
        if ( receiver && caller && stream) {
            if (caller === 'sender') {
                callUser(receiver);
            }
        }
        if ( !receiver ) {
            if ( connectionRef.current ) {
                connectionRef.current.destroy()
            }
        }
    },[receiver, caller, stream])
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
                    {
                        receiver && <Camera ref={userVideo} autoPlay playsInline></Camera>    
                    }
                    <Camera ref={myVideo} autoPlay muted playsInline></Camera>
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