import { Link } from "react-router-dom"
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr"
import { useState } from "react";

import { toast } from 'react-toastify';
import axios from "axios";
import { apiUrl } from "../../constant/constant";

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newdate, setNewdate] = useState('');
    const [gender, setGender] = useState('man');
    const [birthdayError, setBirthdayError] = useState("")
    const handleValidate = () => {
        if ( !fullname.trim().length ) {
            toast.warn("Fullname is missing")
            return false;
        } else if ( !email.trim().length ) {
            toast.warn("Email is missing")
            return false;
        } else {
            const currentYear = new Date().getFullYear()
            const birthdayYear = new Date(newdate).getFullYear()
            const age = currentYear - birthdayYear + 1
            if ( age < 18 ) {
                setBirthdayError("must be over 18 age");
                return false;
            } else if ( !username.trim().length ) {
                toast.warn("Username is missing");
                return false;
            } else if ( password.trim().length < 6 ) {
                toast.warn("Password must be over 6 letters")
                return false;
            }
        }
        return true;
    }
    const submitHandler = async(e) => {
        e.preventDefault();
        if ( !handleValidate() ) return;
        const user = {
            fullname: fullname,
            email: email,
            birthday: newdate,
            gender: gender,
            username: username,
            password, password
        }
        axios
        .post(`${apiUrl}/login`, user)
        .then((res) => {
            toast.success(res.data.message)
            window.location.href="../login";
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
    const handleChangeBirthday = (date) => {
        const currentYear = new Date().getFullYear()
        const birthdayYear = new Date(date).getFullYear()
        const age = currentYear - birthdayYear + 1
        if ( age < 18 ) {
            setBirthdayError("must be over 18 age");
        } else {
            setNewdate(new Date(date).toISOString().slice(0,10))
            setBirthdayError("")
        }
    }
    const handleInputChange = (e, type) => {
        switch(type) {
            case 'fullname':
                setFullname(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'username':
                setUsername(e.target.value);
                break;
            default:
                break;
        }
    }
    return (
        <div className="authincation h-100 p-meddle">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-12 relative left-background">
                        <img src="/register.png" alt="register" className="absolute top-24 left-12"/>
                    </div>
                    <div className="col-md-6 col-sm-12 col-12 flex justify-end">
                        <div className="authincation-content mt-14">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                        <div className="text-left mb-3">
                                            <h2 className="text-4xl">Let's open <br />Your <Link to="/" className="text-4xl text-[#ff8100]">
                                                Omegle
                                            </Link> account
                                            </h2>
                                        </div>
                                        <h4 className="text-left mb-4 ">Tell us a bit about yourself</h4>
                                        <form onSubmit={(e) => submitHandler(e)}>
                                            <div className="form-group">
                                                <label className="mb-1 ">
                                                    <strong>Full Name</strong>
                                                </label>
                                                <input
                                                    type="fullname"
                                                    id="fullname"
                                                    name="fullname"
                                                    value={fullname}
                                                    onChange={(e) => handleInputChange(e, 'fullname')}
                                                    className="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-1 ">
                                                    <strong>Email Address</strong>
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => handleInputChange(e, 'email')}
                                                    className="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10"
                                                />
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <div className="w-full">
                                                    <label className="mb-1 ">
                                                        <strong>BirthDay</strong>
                                                    </label>
                                                    <div className="form-group">
                                                        <Flatpickr
                                                            className="w-full h-[20] p-2 rounded-md"
                                                            value={newdate}
                                                            onChange={(date) => {
                                                                handleChangeBirthday(date)
                                                            }}
                                                        />
                                                    </div>
                                                    {
                                                        birthdayError && (<span className="text-[#ff0000]">{birthdayError}</span>)
                                                    }
                                                </div>
                                                <div className="w-full">
                                                    <label className="mb-1">
                                                        <strong>Gender</strong>
                                                    </label>
                                                    <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-gray-200 p-1.5">
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                name="option"
                                                                id="man"
                                                                value="man"
                                                                className="peer hidden"
                                                                checked={gender==='man'? true: false}
                                                                onChange={() => setGender('man')}
                                                            />
                                                            <label
                                                                htmlFor="man"
                                                                className="block cursor-pointer select-none rounded-xl p-1 text-center peer-checked:bg-orange-400 peer-checked:font-bold peer-checked:text-white"
                                                            >
                                                                Man
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="radio"
                                                                name="option"
                                                                id="woman"
                                                                value="woman"
                                                                className="peer hidden"
                                                                checked={gender==='woman'? true: false}
                                                                onChange={() => setGender('woman')}
                                                            />
                                                            <label
                                                                htmlFor="woman"
                                                                className="block cursor-pointer select-none rounded-xl p-1 text-center peer-checked:bg-orange-400 peer-checked:font-bold peer-checked:text-white"
                                                            >
                                                                Woman
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-1">
                                                    <strong>Username</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    value={username}
                                                    onChange={(e) => handleInputChange(e, 'username')}
                                                    className="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-1 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="mb-1">
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
                                            <div className="text-center mt-4">
                                                <button type="submit" className="py-3 px-4 items-center gap-x-2 text-sm font-semibold w-full text-center rounded-lg border border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 disabled:opacity-50 disabled:pointer-events-none">
                                                    JOIN NOW
                                                </button>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p className="">
                                                Already have account?{" "}
                                                <Link className="text-primary text-[#ff8100] text-lg" to="../login">
                                                    Log In
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

export default Register