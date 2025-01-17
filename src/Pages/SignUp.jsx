import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";

export default function SignUp() {
  const [formdata, setFormdata] = useState({});
  const [error, setErrors] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate=useNavigate();
  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await fetch("/Api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setloading(false);
        setErrors(data.message);
        return;
      }
      setloading(false);
      setErrors(null)
      navigate('/signin')
    } catch (error) {
      setloading(false);
      setErrors(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-l"
          id="username"
          onChange={handlechange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth></OAuth>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
