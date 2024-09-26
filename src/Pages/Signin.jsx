import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  SignInFailure,
  SignInSuccess,
} from "../redux/user/userSlice.js";
import OAuth from "../component/OAuth.jsx";

export default function SignIn() {
  const [formdata, setFormdata] = useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/Api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(SignInFailure(data.message));
        return;
      }
      dispatch(SignInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-l"
          id="email"
          onChange={handlechange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-l"
          id="password"
          onChange={handlechange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign in"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
