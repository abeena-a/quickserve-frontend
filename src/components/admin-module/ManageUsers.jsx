import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addUser, deleteUser, editUser } from "../../redux/registerSlice";
import { useEffect } from "react";

import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUserAsync,
} from "../../redux/userSlice";

// Validation helper
const validateNewUser = (role, data) => {
    const newErrors = {};
    if (role === "client" && (!data.name || data.name.length < 2)) {
        newErrors.name = "Name must be at least 2 characters.";
    }
    if (role === "vendor" && (!data.company || data.company.length < 2)) {
        newErrors.company = "Company name must be at least 2 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = "Invalid email format.";
    }
    if (!/^\d{10}$/.test(data.contact)) {
        newErrors.contact = "Contact number must be 10 digits.";
    }
    if (role === "client" && (!data.state || data.state.length < 2)) {
        newErrors.state = "State is required.";
    }
    if (role === "client" && (!data.address || data.address.length < 2)) {
        newErrors.address = "Address must be at least 2 characters.";
    }
    return newErrors;
};




const states = [
    "Kerala", "Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "Uttar Pradesh",
    "West Bengal", "Gujarat", "Rajasthan", "Punjab", "Haryana", "Bihar", "Assam",
    "Odisha", "Madhya Pradesh", "Telangana", "Andhra Pradesh", "Goa", "Jharkhand",
    "Chhattisgarh", "Himachal Pradesh", "Uttarakhand", "Tripura", "Manipur",
    "Meghalaya", "Nagaland", "Mizoram", "Sikkim"
];


export default function ManageUsers() {
    const [activeTab, setActiveTab] = useState("client");
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errors, setErrors] = useState({});



    const [newUser, setNewUser] = useState({
        name: "",
        company: "",
        email: "",
        contact: "",
        state: "",
        address: "",
        role: "client",
        password: "Welcome@123",
    });

    // const users = useSelector((state) => state.register.users);


    const dispatch =
        useDispatch();

    const users =
        useSelector(
            (state) =>
                state.users.users
        );

    useEffect(() => {
        dispatch(
            fetchUsers()
        );
    }, [dispatch]);

    // Filter by role + search term
    const filteredUsers = users
        .filter((u) => u.role === activeTab)
        .filter((u) =>
            [u.name, u.email, u.company]
                .filter(Boolean)
                .some((field) =>
                    field.toLowerCase().includes(searchTerm.toLowerCase())
                )
        );

    // const handleDelete = (id) => {
    //     dispatch(deleteUser(id));
    // };


    const handleDelete = async (id) => {
        try {

            await dispatch(
                deleteUserAsync(id)
            ).unwrap();

        } catch (error) {
            alert(
                error.message ||
                "Failed to delete user"
            );
        }
    };

    // const handleAddUser = () => {
    //     const id = Date.now().toString();
    //     dispatch(addUser({ ...newUser, id, role: activeTab }));
    //     setShowAddModal(false);
    //     setNewUser({
    //         id: "",
    //         name: "",
    //         username: "",
    //         email: "",
    //         company: "",
    //         location: "",
    //         address: "",
    //         role: activeTab,
    //         password: "123456",
    //     });
    // };


    const handleAddUser = async () => {
        try {

            await dispatch(
                createUser({
                    ...newUser,
                    role: activeTab,
                    password:
                        newUser.password ||
                        "Welcome@123",
                })
            ).unwrap();

            alert(
  `User created successfully!

Email: ${newUser.email}

Default Password: Welcome@123

Please share these credentials with the user.`
);

            setShowAddModal(false);

            setNewUser({
                name: "",
                company: "",
                email: "",
                contact: "",
                state: "",
                address: "",
                role: activeTab,
                password: "Welcome@123",
            });

        } catch (error) {

            alert(
                error.message ||
                "Failed to create user"
            );
        }
    };


    // const handleEditUser = () => {
    //     dispatch(editUser({ id: selectedUser.id, updatedData: selectedUser }));
    //     setShowEditModal(false);
    //     setSelectedUser(null);
    // };


    const handleEditUser = async () => {

        try {

            await dispatch(
                updateUser({
                    id: selectedUser._id,
                    userData: selectedUser,
                })
            ).unwrap();

            setShowEditModal(false);
            setSelectedUser(null);

        } catch (error) {

            alert(
                error.message ||
                "Failed to update user"
            );
        }
    };



    return (
        <div className="bg-white shadow rounded p-6">
            {/* Title + Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Manage Users</h1>
                <button
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                    onClick={() => setShowAddModal(true)}
                >
                    + Add {activeTab === "client" ? "Client" : "Vendor"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${activeTab === "client"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-black"
                        }`}
                    onClick={() => setActiveTab("client")}
                >
                    Client
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === "vendor"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 text-black"
                        }`}
                    onClick={() => setActiveTab("vendor")}
                >
                    Vendor
                </button>
            </div>

            {/*  Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, username, email, or company..."
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Users Table */}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-purple-100 text-left">
                        <th className="p-2">Sl No</th>
                        {activeTab === "client" ? (
                            <>
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Contact</th>
                                <th className="p-2">State</th>
                                <th className="p-2">Address</th>
                            </>
                        ) : (
                            <>
                                <th className="p-2">Company Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Contact</th>
                            </>
                        )}
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user, index) => (
                            <tr key={user._id} className="border-b">
                                <td className="p-2">{index + 1}</td>
                                {activeTab === "client" ? (
                                    <>
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.contact}</td>
                                        <td className="p-2">{user.state}</td>
                                        <td className="p-2">{user.address}</td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-2">{user.company}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.contact}</td>
                                    </>
                                )}
                                <td className="p-2 space-x-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setShowEditModal(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center p-4 text-gray-500">
                                No {activeTab} users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>


            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 flex justify-center items-center 
                  bg-white/30 backdrop-blur-sm">
                    <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold mb-4">
                                Add {activeTab === "client" ? "Client" : "Vendor"} User
                            </h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowAddModal(false);   // close modal
                                    setErrors({});
                                    setNewUser({
                                        // id: "",
                                        name: "",
                                        company: "",
                                        email: "",
                                        contact: "",
                                        address: "",
                                        state: "",
                                        role: activeTab,
                                        password: "Welcome@123"
                                    });
                                }}
                            >
                                ✕
                            </button>
                        </div>



                        <div className="space-y-3">
                            {activeTab === "client" ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full border p-2 rounded"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border p-2 rounded"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                                    {/* Phone with +91 prefix */}
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value="+91"
                                            disabled
                                            className="w-16 border rounded-l px-2 py-2 bg-gray-200"
                                        />
                                        <input
                                            type="text"
                                            placeholder="10-digit mobile number"
                                            className="flex-grow border rounded-r px-3 py-2"
                                            value={newUser.contact}
                                            onChange={(e) =>
                                                setNewUser({ ...newUser, contact: e.target.value })
                                            }
                                        />
                                    </div>
                                    {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}

                                    {/* State dropdown */}
                                    <select
                                        value={newUser.state}
                                        onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                                        className="w-full border p-2 rounded"
                                    >
                                        <option value="">Select State</option>
                                        {states.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}

                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="w-full border p-2 rounded"
                                        value={newUser.address}
                                        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        className="w-full border p-2 rounded"
                                        value={newUser.company}
                                        onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                                    />
                                    {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border p-2 rounded"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                                    {/* Phone with +91 prefix */}
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value="+91"
                                            disabled
                                            className="w-16 border rounded-l px-2 py-2 bg-gray-200"
                                        />
                                        <input
                                            type="text"
                                            placeholder="10-digit mobile number"
                                            className="flex-grow border rounded-r px-3 py-2"
                                            value={newUser.contact}
                                            onChange={(e) =>
                                                setNewUser({ ...newUser, contact: e.target.value })
                                            }
                                        />
                                    </div>
                                    {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                                </>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">

                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => {
                                    setShowAddModal(false);   // close modal
                                    setErrors({});            // clear validation errors
                                    setNewUser({
                                        // id: "",
                                        name: "",
                                        company: "",
                                        email: "",
                                        contact: "",
                                        address: "",
                                        state: "",
                                        role: activeTab,
                                        password: "Welcome@123"
                                    });                       // reset form fields
                                }}
                            >
                                Cancel
                            </button>


                            <button
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    const newErrors = validateNewUser(activeTab, newUser);
                                    setErrors(newErrors);
                                    if (Object.keys(newErrors).length === 0) {
                                        handleAddUser();
                                    }
                                }}
                            >
                                Save
                            </button>

                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 flex justify-center items-center 
                  bg-white/30 backdrop-blur-sm">
                    <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold mb-4">
                                Edit {activeTab === "client" ? "Client" : "Vendor"} User
                            </h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowEditModal(false);   // close modal
                                    setErrors({});
                                    setSelectedUser(null);     // clear selected user
                                }}
                            >
                                ✕
                            </button>
                        </div>






                        <div className="space-y-3">
                            {activeTab === "client" ? (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full border p-2 rounded"
                                        value={selectedUser.name}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, name: e.target.value })
                                        }
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border p-2 rounded"
                                        value={selectedUser.email}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, email: e.target.value })
                                        }
                                    />
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value="+91"
                                            disabled
                                            className="w-16 border rounded-l px-2 py-2 bg-gray-200"
                                        />
                                        <input
                                            type="text"
                                            placeholder="10-digit mobile number"
                                            className="flex-grow border rounded-r px-3 py-2"
                                            value={selectedUser.contact}
                                            onChange={(e) =>
                                                setSelectedUser({ ...selectedUser, contact: e.target.value })
                                            }
                                        />
                                    </div>
                                    <select
                                        value={selectedUser.state}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, state: e.target.value })
                                        }
                                        className="w-full border p-2 rounded"
                                    >
                                        <option value="">Select State</option>
                                        {states.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        className="w-full border p-2 rounded"
                                        value={selectedUser.address}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, address: e.target.value })
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        className="w-full border p-2 rounded"
                                        value={selectedUser.company}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, company: e.target.value })
                                        }
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full border p-2 rounded"
                                        value={selectedUser.email}
                                        onChange={(e) =>
                                            setSelectedUser({ ...selectedUser, email: e.target.value })
                                        }
                                    />
                                    <div className="flex">
                                        <input
                                            type="text"
                                            value="+91"
                                            disabled
                                            className="w-16 border rounded-l px-2 py-2 bg-gray-200"
                                        />
                                        <input
                                            type="text"
                                            placeholder="10-digit mobile number"
                                            className="flex grow border rounded-r px-3 py-2"
                                            value={selectedUser.contact}
                                            onChange={(e) =>
                                                setSelectedUser({ ...selectedUser, contact: e.target.value })
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setSelectedUser(null);
                                    setErrors({}); //  clear errors when closing
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    const newErrors = validateNewUser(activeTab, selectedUser);
                                    setErrors(newErrors);
                                    if (Object.keys(newErrors).length === 0) {
                                        handleEditUser();
                                    }
                                }}
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}