
import { useState } from "react";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user",JSON.stringify(res.data.user)
);

      window.location.href = "/dashboard";

      console.log(res.data);
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Employee Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4"
          onChange={handleChange}
        />

        <button
          className="w-full bg-black text-white py-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;