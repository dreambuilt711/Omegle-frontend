import React, { Fragment, useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import OmegleLogo from "../assets/Omegle2.png"
// import { FaFacebookF, FaTwitter } from "react-icons/fa6"
// import { FcGoogle } from "react-icons/fc"
// import { FaSortDown } from "react-icons/fa"
import { TbLogout } from "react-icons/tb";
import { useChat } from '../contextApi/ChatContext'
import styled from 'styled-components'

const Header = () => {

    const { user, setUser, onlineUsers, receiver, setIsTyping, setMessage, setReceiver } = useChat()
    const [admin, setAdmin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (receiver?.socketId !== undefined && !onlineUsers.find((user) => user._id === receiver?.socketId)) {
            setIsTyping(false)
            setMessage("")
            setReceiver(null)
        }
    }, [onlineUsers]);
    useEffect(() => {
        const url = window.location.href;
        const pathname = new URL(url).pathname;
        const segment = pathname.split('/')[1];
        if ( segment === 'admin' ) setIsAdmin(true);
        else if (segment === 'register') setIsRegister(true);
        else setIsLogin(true);
        const tmpAdmin = window.sessionStorage.getItem('admin_user');
        if (tmpAdmin) setAdmin(tmpAdmin);
    },[])
    const handleLogout = () => {
        setUser(null);
        window.sessionStorage.removeItem('logged_user');
        window.location.reload();
    }
    const handleAdminLogout = () => {
        window.sessionStorage.removeItem('admin_user');
        window.location.reload();
    }
    return (
        <Fragment>
            {
                isAdmin
                ? (
                    <HeaderContainer className="header">
                        <LogoWrapper className='logoWrapper'>
                            <Image src={OmegleLogo} alt="Omegle Logo" />
                            <NavWrapper className='rotatedText'>
                                <li className="mr-3">
                                    <Link to="/admin" className="inline-block py-2 px-4 font-semibold text-gray-600 no-underline hover:text-gray-200 hover:text-underline">Users</Link>
                                </li>
                                <li className="mr-3">
                                    <Link to="/admin/interests" className="inline-block text-gray-600 font-semibold no-underline hover:text-gray-200 hover:text-underline py-2 px-4">Interests</Link>
                                </li>
                            </NavWrapper>
                        </LogoWrapper>

                        <HeaderRight className='headerRight'>
                            <LiveUsersWrapper>
                                {
                                    admin && <Button onClick={handleAdminLogout}><TbLogout size={24} /></Button>
                                }
                            </LiveUsersWrapper>
                        </HeaderRight>
                        <HeaderRight className='headerMobileRight'>

                        </HeaderRight>
                    </HeaderContainer>
                ) : (
                    <HeaderContainer className="header">
                        <LogoWrapper className='logoWrapper'>
                            <Image src={OmegleLogo} alt="Omegle Logo" />
                            <HeaderText className='rotatedText'>Talk to strangers!</HeaderText>
                        </LogoWrapper>

                        <HeaderRight>
                            {/* <ButtonsGroup>
                                <Button style={{ background: "#4A549A" }}><FaFacebookF />
                                    Share</Button>
                                <Button style={{ background: "#728EC5" }}><FaTwitter />
                                    Tweet</Button>
                                <SelectButton>
                                    <FcGoogle />
                                    Choose a language
                                    <FaSortDown />
                                </SelectButton>
                            </ButtonsGroup> */}
                            <LiveUsersWrapper>
                                {
                                    user && <Button onClick={handleLogout}><TbLogout size={24} /></Button>
                                }
                                {
                                    !user && isLogin && <AuthButton><a href="/register">Join Now</a></AuthButton>
                                }
                                {
                                    !user && isRegister && <AuthButton><a href="/login">Log In</a></AuthButton>
                                }
                                {/* <LiveUsersNumber>{onlineUsers.length} +</LiveUsersNumber>
                                <LiveUsersText>Live users</LiveUsersText> */}
                            </LiveUsersWrapper>
                        </HeaderRight>

                    </HeaderContainer>
                ) 
            }
        </Fragment>
    )
}

export default Header

const HeaderContainer = styled.div({
    padding: "10px 30px",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

const NavWrapper = styled.ul({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
})

const LogoWrapper = styled.div({
    display: "flex",
    alignItems: "center",
    gap: "50px"
})

const Image = styled.img({
    height: "50px"
})

const HeaderText = styled.p({
    fontSize: "27px",
    fontWeight: "700",
    rotate: "-4deg"
})

const HeaderRight = styled.div({
    flexDirection: "column",
    alignItems: "end"
})

const ButtonsGroup = styled.div({
    display: "flex",
    gap: "10px"
})

const Button = styled.button({
    fontSize: "10px",
    color: "white",
    background: "#4A549A",
    border: "none",
    borderRadius: "2px",
    display: "flex",
    gap: "5px",
    alignItems: "center",
    padding: '5px',
    borderRadius: '50px'
})

const AuthButton = styled.button({
    color: "#ff8100",
    border: "none",
    borderRadius: "2px",
    display: "flex",
    gap: "5px",
    alignItems: "center",
    padding: '10px',
})

// const SelectButton = styled.button({
//     padding: "2px 10px",
//     border: "1px solid gray",
//     borderRadius: "2px",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px"
// })

const LiveUsersWrapper = styled.div({
    marginTop: "5px",
    display: 'flex',
    gap: "5px",
    alignItems: "center"
})

// const LiveUsersNumber = styled.p({
//     fontSize: "25px",
//     color: "#9DB2D7"
// })

// const LiveUsersText = styled.p({
//     color: "#b6d1f0"
// })