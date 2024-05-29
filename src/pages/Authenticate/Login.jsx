import { useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { apiUrl } from "../../constant/constant";
import { toast } from "react-toastify";
import { useChat } from "../../contextApi/ChatContext";

const Login = () => {
    const {setUser} = useChat()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleValidate = () => {
        if ( !username.trim().length ) {
            toast.warn("Username is missing");
            return false;
        } else if ( password.trim().length < 6 ) {
            toast.warn("Password must be over 6 letters")
            return false;
        }
        return true;
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if ( !handleValidate() ) return;
        const ipAddress = await axios
        .get('https://api.ipify.org/?format=json')
        .then(res => {
            return res.data.ip;
        })
        .catch(err => {
            return '';
        })
        axios
        .get(`${apiUrl}/login/${username}/${password}/${ipAddress}`)
        .then((res) => {
            const user = res.data;
            delete user.password;
            setUser(user);
            window.sessionStorage.setItem('logged_user', JSON.stringify(user));
            window.location.reload();
        })
        .catch((error) => {
            let message = error.response;
            if ( !message ) return toast.error("Server Error");
            message = message.data;
            if ( !message ) return toast.error("Server Error");
            message = message.message;
            if ( !message ) return toast.error("Server Error");
            toast.error(message);
        })
    }
    const handleInputChange = (e, type) => {
        switch(type) {
            case "username":
                setUsername(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }
    return (
        <div className="authentication h-100 p-meddle">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-12 flex justify-center">
                        <div className="authincation-content mt-14">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <div className="text-left mb-5">
                                            <h2 className="text-4xl">Log in to <Link to="/" className="text-4xl text-[#ff8100]">
                                                Omegle
                                            </Link>
                                            </h2>
                                        </div>
                                        <form onSubmit={(e) => submitHandler(e)}>
                                            <div className="form-group">
                                                <label className="mb-1" htmlFor="username">
                                                    <strong>Username</strong>
                                                </label>
                                                <input
                                                    type="username"
                                                    id="username"
                                                    name="username"
                                                    value={username}
                                                    onChange={(e) => handleInputChange(e, 'username')}
                                                    className="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-1" htmlFor="password">
                                                    <strong>Password</strong>
                                                </label>
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => handleInputChange(e, 'password')}
                                                    className="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10"
                                                />
                                            </div>
                                            <div className="form-row flex justify-between mt-4 mb-2 gap-24">
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox ml-1 ">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="basic_checkbox_1"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="basic_checkbox_1"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <Link className="text-red-900" to="../forgot-password">
                                                        Forgot Password?
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="py-3 px-4 items-center gap-x-2 text-sm font-semibold w-full text-center rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none">
                                                    Log In
                                                </button>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p className="">
                                                New to the Omegle?{" "}
                                                <Link className="text-primary text-[#ff8100] text-lg" to="../register">
                                                    JOIN NOW
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login