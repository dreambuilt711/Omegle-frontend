import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components'
import usaFlag from "../../assets/usaFlag.jpg";
import { useChat } from '../../contextApi/ChatContext';
import { apiUrl } from '../../constant/constant';

const HomeDesktop = ({ setIsTermsModal }) => {
    const {setUser, setInterests} = useChat()
    const dropdownRef = useRef();
    const interestRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState({});
    const [interestsItem, setInterestsItem] = useState([]);
    const [setIsModal, setIsModalVideo] = setIsTermsModal;
    const [logged, setLogged] = useState(false)
    const selectTag = (item) => {
        setSelectedInterest(item);
        setInterests(item.text);
        setDropdown(false);
    }
    const toogleDropdown = () => {
        setDropdown(!dropdown)
    };
    useEffect(() => {
        const user = sessionStorage.getItem('logged_user');
        if ( user ) {
            setUser(JSON.parse(user));
            setLogged(true)
        }
        axios
        .get(`${apiUrl}/get_all_interests`)
        .then((res) => {
            setInterestsItem(res.data)
        })
        .catch((error) => {
            console.error(error);
        })
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !interestRef.current.contains(event.target)) {
              setDropdown(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    },[])
    return (
        <DesktopHome className='homeDesktop'>
            <NoAppNeedText>You don't need an app to use Omegle on your phone or tablet! The web site works great on mobile.
            </NoAppNeedText>
            <ImageWrapper>
                <Image src={usaFlag} alt="USA Flag" />
            </ImageWrapper>

            <AboutOmegleText>
                Omegle (oh-meg-ull) is a great way to meet new friends. When you use Omegle, we pick someone else at random and let you talk one-on-one. To help you stay safe, chats are anonymous unless you tell someone who you are (not suggested!), and you can stop a chat at any time. Predators have been known to use Omegle, so please be careful.
            </AboutOmegleText>
            <SameInteretsText>
                If you prefer, you can add your interests, and Omegle will look for someone who's into some of the same things as you instead of someone completely random.
            </SameInteretsText>

            <AgeLimitText>By using Omegle, you accept the terms at the bottom.You must be 18 + or 13 + with parental permission.</AgeLimitText>

            <VideoMonitoringBox>
                <VideoMonitoringText>Video is monitored.Keep it clean!</VideoMonitoringText>
                {/* <UnmoderatedSection>
                    <AgeText>18+:</AgeText>
                    <UnmoderatedSectionText>{`(Adult) (Unmoderated Section)`}</UnmoderatedSectionText>
                </UnmoderatedSection> */}
            </VideoMonitoringBox>

            <HomeBottom>
                <div className='relative'>
                    <InputLabel>What do you wanna talk about?</InputLabel>
                    {
                        dropdown? (
                            <div ref={dropdownRef} className="absolute shadow w-full bg-white z-40 lef-0 rounded max-h-select overflow-y-auto border border-inherit" style={{bottom:'52px'}}>
                                <div className="flex flex-col w-full">
                                    { interestsItem.map((item, key) => (
                                        <div key={key} className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-[#fb923c]" onClick={() => selectTag(item)}>
                                            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-[#fb923c]">
                                                <div className="w-full items-center flex">
                                                    <div className="mx-2 leading-6">
                                                        { item.text }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null
                    }
                    <div className="flex flex-col items-center" ref={interestRef}>
                        <div className="w-full ">
                            <div className="my-2 p-1 flex border border-gray-200 bg-white rounded-md">
                                <div className="flex flex-auto flex-wrap">
                                    <div className="flex-1" onClick={toogleDropdown}>
                                        <input placeholder="" value={selectedInterest.text?selectedInterest.text:''} readOnly className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"/>
                                    </div>
                                </div>
                                <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200" onClick={toogleDropdown}>
                                    <div className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up w-4 h-4">
                                            <polyline points="18 15 12 9 6 15"></polyline>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <ButtonsLabel>Let's jump!</ButtonsLabel>
                    {
                        logged
                        ? (
                            <ButtonsWrapper>
                                <Button className='textBtn' onClick={() => setIsModal(true)}>Text</Button>
                                <p>or</p>
                                <Button className='videoBtn' onClick={() => setIsModalVideo(true)}>Video</Button>
                            </ButtonsWrapper>
                        )
                        : (
                            <ButtonsWrapper>
                                <Button className='textBtn'><Link to="/login">Login</Link></Button>
                            </ButtonsWrapper>
                        )
                    }
                </div>
            </HomeBottom>

            {/* <CollegeStudentBox>
                <PlayIcon>▶️</PlayIcon>
                <p><strong>College student</strong> chat</p>
            </CollegeStudentBox> */}
        </DesktopHome >
    )
}

export default HomeDesktop

const DesktopHome = styled.div({
    padding: "10px",
    margin: "15px auto",
    border: "1px solid #CCC",
    borderRadius: "10px",
})


const NoAppNeedText = styled.p({
    fontSize: "14px",
    textAlign: "center",
    fontWeight: "600"
})

const ImageWrapper = styled.div({
    display: "flex",
    justifyContent: "center"
})

const Image = styled.img({
    height: "170px",
    width: "350px",
    margin: "20px 0",
    background: "rgba(0, 0, 1, 0.01)",
    objectFit: "cover"
})

const AboutOmegleText = styled.p({
    fontSize: "16px",
    lineHeight: "24px"
})

const SameInteretsText = styled.p({
    fontSize: "16px",
    lineHeight: "24px",
    marginTop: "10px"
})

const AgeLimitText = styled.p({
    fontSize: "11px",
    textAlign: "center",
    fontWeight: "500",
    marginTop: "15px"
})

const VideoMonitoringBox = styled.div({
    width: "fit-content",
    padding: "10px 40px",
    margin: "20px auto",
    background: "#BFDEFF",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
})

const VideoMonitoringText = styled.p({
    fontSize: "24px",
    fontWeight: "600"
})

// const UnmoderatedSection = styled.div({
//     display: "flex",
//     gap: "10px"
// })

// const AgeText = styled.strong({
//     fontSize: "12px"
// })

// const UnmoderatedSectionText = styled.p({
//     color: "blue",
//     fontSize: "12px",
//     textDecoration: "underline"
// })

const HomeBottom = styled.div({
    marginBottom: "10px",
    display: 'flex',
    justifyContent: "space-between"
})

const InputLabel = styled.div({
    marginBottom: "5px",
    textAlign: "center",
    fontSize: "18px"
})

const Input = styled.input({
    textAlign: "left",
    fontSize: "19px",
    padding: "14px",
    width: "330px",
    border: "1px solid #CCC",
    borderRadius: "2px",
})

const ButtonsLabel = styled.p({
    marginBottom: "5px",
    textAlign: "center",
    fontSize: "18px"
})

const ButtonsWrapper = styled.div({
    display: "flex",
    gap: "10px",
    alignItems: "center"
})

const Button = styled.button({
    fontSize: "20px",
    color: "white",
    fontWeight: "500",
    width: "120px",
    padding: "14px",
    border: "none",
    borderRadius: "4px"
})

// const CollegeStudentBox = styled.div({
//     padding: "8px",
//     width: "330px",
//     background: "rgb(238, 238, 238)",
//     border: "1px solid rgb(204, 204, 204)",
//     borderRadius: "8px",
//     display: "flex",
//     justifyContent: "space-around",
//     position: "relative"
// })

// const PlayIcon = styled.p({
//     position: "absolute",
//     left: "20px",
//     top: "2px"
// })