import React, { useEffect, useState } from 'react';

import TermsModal from '../components/Home/TermsModal';
import TermsModalVideo from '../components/Home/TermsModalVideo';
import HomeDesktop from '../components/Home/HomeDesktop';
import HomeMobile from '../components/Home/HomeMobile';
import { socket } from '../Socket';
import { useChat } from '../contextApi/ChatContext';

const Home = () => {
    const { userId, receiver, isSearching, setReceiver, setIsTyping, setMessage, setIsSearching } = useChat()
    const [isTermsModal, setIsTermsModal] = useState(false);
    const [isTermsModalVideo, setIsTermsModalVideo] = useState(false);

    useEffect(() => {
        if (userId && isSearching) {
            socket.emit("unpairing-user", userId, () => {
                setIsSearching(false)
            })
        }

        if (receiver) {
            socket.emit("chat-close", receiver, () => {
                setReceiver("")
                setIsTyping(false)
                setMessage("")
            })
        }
    }, [userId, isSearching, receiver]);

    return (
        <>
            <HomeDesktop setIsTermsModal={[setIsTermsModal, setIsTermsModalVideo]} />
            {/* mobile */}
            <HomeMobile setIsTermsModal={[setIsTermsModal, setIsTermsModalVideo]} />

            {isTermsModal && <TermsModal setIsTermsModal={setIsTermsModal} />}
            {isTermsModalVideo && <TermsModalVideo setIsTermsModalVideo={setIsTermsModalVideo} />}

        </>
    )
}

export default Home

