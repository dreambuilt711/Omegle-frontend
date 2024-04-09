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
          socket.emit('answerCall', { signal: data, to: receiver.socketId});
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
        if ( receiver?.socketId && caller && stream) {
            if (caller === 'sender') {
                callUser(receiver.socketId);
            }
        }
        if ( !receiver?.socketId ) {
            if ( connectionRef.current ) {
                connectionRef.current.destroy()
            }
        }
    },[receiver, caller, stream])
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
            <Wrapper>
                <VideoWrapper>
                    {
                        callAccepted
                        ? (<Camera ref={userVideo} autoPlay playsInline></Camera>)
                        :(<LoadingCamera>
                            <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                                <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                    <path d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900"></path>
                                </svg>
                            </div>
                        </LoadingCamera>)
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
    width: "500px",
    height: "400px"
})
const LoadingCamera = styled.div({
    width: "500px",
    height: "400px"
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