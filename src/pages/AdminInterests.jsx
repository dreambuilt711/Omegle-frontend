import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../constant/constant";

import { MdDelete } from "react-icons/md";

const AdminInterests = () => {
    const [interests, setInterests] = useState([]);
    const [newInterests, setNewInterests] = useState('');
    const getAllInterests = async() => {
        axios
        .get(`${apiUrl}/get_all_interests`)
        .then((res) => {
            setInterests(res.data)
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
    useEffect(() => {
        getAllInterests()
    },[])
    const handleAddItem = () => {
        if (!newInterests) {
            return toast.warn("Interest must be over 3 length");
        }
        axios
        .post(`${apiUrl}/add_interest`, {text: newInterests})
        .then((res) => {
            setNewInterests('');
            setInterests([...interests, res.data]);
            toast.success("Successfully added category item");
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
    const handleDeleteItem = (_id) => {
        console.log(_id);
        axios
        .delete(`${apiUrl}/delete_interest/${_id}`)
        .then((res) => {
            toast.success(res.data.message);
            const tmpInterests = interests.filter((item) => item._id !== _id)
            setInterests(tmpInterests);
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
    return (
        <>
            <div className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl p-6">
                <h3>Interests management</h3>
            </div>
            <div className="py-3 px-4 interestTable w-3/6">
                <div className="flex justify-between gap-5">
                    <input
                        type="text"
                        value={newInterests}
                        onChange={(e) => setNewInterests(e.target.value)}
                        className="py-2 px-4 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Add to interest item"
                    />
                    <button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
                </div>
                <div className="mt-4">
                {
                    interests.length ? (
                        <table className="text-left" width="100%">
                            <thead>
                                <tr>
                                    <th width="80%">Name</th>
                                    <th width="20%" style={{textAlign: 'right'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                interests.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-1 pl-0"><p className="bg-[#fdd5b9] rounded p-1" style={{
                                            boxShadow: '1px 1px 3px #fbd6a8'
                                        }}>{item.text}</p></td>
                                        <td><MdDelete className="cursor-pointer ml-24" color="red" onClick={() => handleDeleteItem(item._id)}/></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-2xl text-center">Category is currently empty</p>
                    )
                }
                </div>
            </div>
        </>
    );
}

export default AdminInterests;