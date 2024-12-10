import { Link } from "react-router";

import loginBg from "../assets/login.png";
import logo from "../assets/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import ActionButton from "../components/ActionButton";
import useFetch from "../hooks/useFetch";

function Login() {
  const { data: users } = useFetch("http://localhost:3000/users");
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("login", JSON.stringify(loginForm));

    const isEmailValid = users.find((user) => user.email === loginForm.email);
    const isPasswordValid = users.find(
      (user) => user.password === loginForm.password
    );

    if (isEmailValid && isPasswordValid) navigate("/dashboard");
    else setInvalidCredential(true);
  };

  return (
    <section className="flex w-full h-screen bg-white dark:bg-[#2d2d30]">
      <div className="flex flex-col w-1/2 items-center justify-center">
        <div>
          <img className="w-[290px] mx-auto" src={logo} alt="logo" />
          <form className="flex flex-col mt-24 gap-y-5">
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px] text-black"
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
            <input
              className="bg-[#FAFBFD] pl-7 py-4 min-w-[400px] rounded-[10px] text-black"
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <ActionButton
              disabled={!loginForm.email || !loginForm.password}
              onClick={handleSubmit}
            >
              Login
            </ActionButton>
          </form>
          {invalidCredential && (
            <p className="text-red-500 mt-4">Email atau password salah</p>
          )}
          <div className="w-full mt-4 text-black dark:text-white">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#19918F] text-left">
              Daftar di sini
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

export default Login;
