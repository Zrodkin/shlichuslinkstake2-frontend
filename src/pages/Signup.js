import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || data.error || "Signup failed");

      setMessage("✅ Signup successful. You can now log in.");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">Shlichus Connect</span>
        <div className="space-x-4 text-sm">
          <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
          <a href="/signup" className="text-gray-600 hover:text-blue-600">Signup</a>
        </div>
      </nav>

      <div className="flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-4">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;