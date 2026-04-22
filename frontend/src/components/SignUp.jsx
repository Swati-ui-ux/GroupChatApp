import React, { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

      console.log("Signup Data:", formData);
      try {
          await axios.post("http://localhost:4000/users/signup", formData)
          setFormData({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
      } catch (error) {
        console.log(error)
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-87.5">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Extra */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to='/login' className="text-green-500 cursor-pointer">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;