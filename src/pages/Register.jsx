import { Link } from "react-router";
import loginBg from "../assets/login.png";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import ActionButton from "../components/ActionButton";
import axios from "axios";

function Register() {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar_url: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        registerForm,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="flex w-full h-screen bg-white">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <img className="w-[290px] mx-auto" src={logo} alt="logo" />
          <form className="flex flex-col mt-24 gap-y-5">
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="name"
              type="text"
              placeholder="Nama Lengkap"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px]"
              name="avatar_url"
              type="text"
              placeholder="Avatar URL"
              onChange={(e) => handleChange(e)}
            />
            <ActionButton onClick={handleSubmit}>Register</ActionButton>
          </form>
          <div className="w-full mt-4 text-black">
            Sudah punya akun?{" "}
            <Link to="/" className="text-[#19918F] text-left">
              Login di sini
            </Link>
          </div>
        </div>
      </div>
      <img
        src={loginBg}
        alt="login background"
        className="w-1/2 object-cover"
      />
    </section>
  );
}

export default Register;