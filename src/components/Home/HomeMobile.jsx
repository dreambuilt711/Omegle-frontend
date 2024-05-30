import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import { useChat } from '../../contextApi/ChatContext';
import { apiUrl } from '../../constant/constant';

const HomeMobile = ({ setIsTermsModal }) => {
    const {setUser, setInterests} = useChat()
    const dropdownRef = useRef();
    const interestRef = useRef();
    const [dropdown, setDropdown] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState({});
    const [interestsItem, setInterestsItem] = useState([]);
    const [setIsModal, setIsModalVideo] = setIsTermsModal;

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
        <MobileHome className='mobileHome'>
            <VideoDescText>Mobile video chat is an experimental new feature. Video is monitored, so keep it clean!
            </VideoDescText>
            <AdultSite>Go to <Link>an adult site</Link> if that's what you want, and you are 18 or older.</AdultSite>
            <ButtonWrapper>
                <Button className='textBtn' onClick={() => setIsModal(true)}>Start a chat</Button>
                <Button className='videoBtn' onClick={() => setIsModalVideo(true)}>video</Button>
            </ButtonWrapper>

            <div className='relative'>
                <InputLabel>Meet strangers with your interests!</InputLabel>
                {
                    dropdown? (
                        <div ref={dropdownRef} className="absolute shadow w-full bg-white z-40 lef-0 rounded max-h-select overflow-y-auto border border-inherit" style={{top:'52px'}}>
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

            <CollegeStudentBox>
                {/* <PlayIcon>►</PlayIcon> */}
                {/* <p><strong>College student</strong> chat</p> */}
            </CollegeStudentBox>

            <AboutOmegleText>
                Omegle (omegul) is a great way to meet new friends, even while practicing social distancing. When you use Omegle, you are paired randomly with another person to talk one-on-one. If you prefer, you can add your interests and you'll be randomly paired with someone who selected
                some of the same interests
            </AboutOmegleText>
        </MobileHome>
    )
}

export default HomeMobile

const MobileHome = styled.div({
    marginTop: "16px",
    border: "1px solid #CCC",

})

const VideoDescText = styled.div({
    textAlign: "center",
    lineHeight: "22px",
    padding: "8px 0"
})

const AdultSite = styled.div({
    textAlign: "center",
    lineHeight: "22px",
    padding: "8px 0"
})

const Link = styled.span({
    color: "blue",
    textDecoration: "underline"
})

const ButtonWrapper = styled.div({
    padding: "8px 0",
    display: "flex",
    justifyContent: "center"
})

const Button = styled.div({
    fontSize: "20px",
    color: "white",
    fontWeight: "500",
    padding: "10px 25px",
    border: "1px solid #ECE8E8",
    borderRadius: "4px"
})

const InputLabel = styled.div({
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "5px"
})

const Input = styled.input({
    fontSize: "15px",
    width: "98%",
    padding: "8px 4px",
    border: "1px solid #dddada",
    borderRadius: "5px",
    textAlign: 'left'
})

const CollegeStudentBox = styled.div({
    padding: "4px",
    marginTop: "10px",
    background: "rgb(238, 238, 238)",
    display: "flex",
    justifyContent: "center",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "5px",
    position: "relative"
})

// const PlayIcon = styled.p({
//     position: "absolute",
//     left: "10px",
//     top: "0px"
// })

const AboutOmegleText = styled.div({
    lineHeight: "22px",
    padding: "10px",
    marginTop: "10px"
})