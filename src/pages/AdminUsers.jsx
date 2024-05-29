import axios from "axios";
import { useEffect, useState } from "react"
import { apiUrl } from "../constant/constant";
import { toast } from "react-toastify";

const AdminUsers = () => {
    const [userList, setUserList] = useState([]);
    const [realUserList, setRealUserList] = useState([]);
    const [search, setSearch] = useState('');
    const getAllUsers = async() => {
        axios
        .get(`${apiUrl}/get_all_user`)
        .then((res) => {
            setRealUserList(res.data)
            console.log(res.data);
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
    const handleCheckout = (e, email) => {
        const params = {
            email: email,
            status: e.target.checked
        }
        axios
        .post(`${apiUrl}/updateUserStatus`, params)
        .then((res) => {
            const tmpUserList = userList.map((item) => {
                if (item.email === res.data.email ) return res.data;
                else return item;
            })
            setUserList(tmpUserList)
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        getAllUsers()
    },[])
    useEffect(() => {
        if (!search) {
            setUserList(realUserList);
        } else {
            const temp = realUserList.filter((item) => item.fullname.toLowerCase().includes(search.toLowerCase()))
            setUserList(temp);
        }
    },[realUserList, search])
    return (
        <>
            <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl p-6">
                <h3>User management</h3>
            </div>
            <div className="py-3 px-4">
                <div className="relative max-w-xs">
                    <label className="sr-only">Search</label>
                    <input
                        type="text"
                        name="hs-table-with-pagination-search"
                        id="hs-table-with-pagination-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Search for items"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                        <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                </div>
            </div>
            <div className="px-4 overflow-auto">
                <table className="divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-[#ff8100]">
                        <tr>
                            <th width="10%"><input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" /></th>
                            <th width="10%" className="px-6 py-3 text-start text-small font-large">Fullname</th>
                            <th width="15%" className="px-6 py-3 text-start text-small font-large">Email</th>
                            <th width="20%" className="px-6 py-3 text-start text-small font-large">IP Address</th>
                            <th width="35%" className="px-6 py-3 text-start text-small font-large">Machine info</th>
                            <th width="10%" className="px-6 py-3 text-start text-small font-large">Baned</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            userList.length === 0
                            ? (<tr className="text-center"><td colSpan={6} className="text-[30px] p-10">There is no users</td></tr>)
                            : (
                                userList.map((one) => (
                                    <tr key={one.username}>
                                        <td className="text-center"><input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" /></td>
                                        <td className="px-6 py-3 text-start text-small font-large">{one.fullname}</td>
                                        <td className="px-6 py-3 text-start text-small font-large">{one.email}</td>
                                        <td className="px-6 py-3 text-start text-small font-large">{one.last_login_ip}</td>
                                        <td className="px-6 py-3 text-start text-small font-large">{one.last_login_machine_info}</td>
                                        <td className="px-6 py-3 text-start text-small font-large">
                                            {
                                                one.role < 3 ? (
                                                    <label className="flex items-center relative w-max cursor-pointer select-none">
                                                        <input type="checkbox" checked={one.status} onChange={(e) => handleCheckout(e, one.email)} className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
                                                        <span className="absolute font-medium text-xs right-3 text-white"> N </span>
                                                        <span className="absolute font-medium text-xs right-9 text-white"> Y </span>
                                                        <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                                                    </label>
                                                ) : null
                                            }
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminUsers;