import { useState } from "react";
import { addUser } from "../redux/registerSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function Register() {

  const dispatch = useDispatch();
    const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
    address: "",
    state: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
   const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const states = [
    "Kerala","Tamil Nadu","Karnataka","Maharashtra","Delhi","Uttar Pradesh",
    "West Bengal","Gujarat","Rajasthan","Punjab","Haryana","Bihar","Assam",
    "Odisha","Madhya Pradesh","Telangana","Andhra Pradesh","Goa","Jharkhand",
    "Chhattisgarh","Himachal Pradesh","Uttarakhand","Tripura","Manipur",
    "Meghalaya","Nagaland","Mizoram","Sikkim"
  ];

  const validate = () => {
    const newErrors = {};

    if (role === "client" && (formData.name.length < 2 || formData.name.length > 25)) {
      newErrors.name = "Name must be 2–25 characters.";
    }
    if (role === "vendor" && (formData.company.length < 2 || formData.company.length > 25)) {
      newErrors.company = "Company name must be 2–25 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 chars with letters, numbers, and special chars.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be 10 digits.";
    }
    if (role === "client" && (formData.address.length < 2 || formData.address.length > 50)) {
      newErrors.address = "Address must be 2–50 characters.";
    }
    if (role === "client" && !formData.state) {
      newErrors.state = "Please select a state.";
    }

    return newErrors;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const newUser = { role, ...formData };
    dispatch(addUser(newUser));   // store in Redux array
    alert(`Registered successfully as ${role}!`);

    // reset form
    setFormData({
      name: "",
      company: "",
      email: "",
      contact: "",
      address: "",
      state: "",
      password: "",
      confirmPassword: "",
    });

    // redirect to login
      navigate("/login");
  }
};

  const inputClass = "border rounded w-full px-3 py-2";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Register as Client or Vendor</h2>

      {/* Role Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${role === "client" ? "bg-purple-400 text-white" : "bg-gray-300"}`}
          onClick={() => setRole("client")}
        >
          Client
        </button>
        <button
          className={`px-4 py-2 rounded ${role === "vendor" ? "bg-purple-400 text-white" : "bg-gray-300"}`}
          onClick={() => setRole("vendor")}
        >
          Vendor
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md space-y-4">
        {role === "client" && (
          <>
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={inputClass} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className={inputClass} />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <select value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className={inputClass}>
                <option value="">Select State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
            </div>
          </>
        )}

        {role === "vendor" && (
          <div>
            <label className="block text-gray-700">Company Name</label>
            <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className={inputClass} />
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
          </div>
        )}

        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={inputClass} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Contact No.</label>
          <div className="flex">
            <input type="text" value="+91" disabled className="w-16 border rounded-l px-2 py-2 bg-gray-200" />
            <input type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="flex-grow border rounded-r px-3 py-2" placeholder="10-digit mobile number" />
          </div>
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
        </div>
{/* 

{/* Password field with eye icon */}
      <div>
        <label className="block text-gray-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="border rounded w-full px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password field with eye icon */}
      <div>
        <label className="block text-gray-700">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="border rounded w-full px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-purple-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Register

        </button>
      </form>
    </div>
  );
}
