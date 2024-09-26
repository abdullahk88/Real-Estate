import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Contackus from "./Pages/Contackus";
import Header from "./component/Header";
import PrivateRoute from "./component/PrivateRoute";
import CreateListing from "./Pages/createListing";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route path="/Contackus" element={<Contackus />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}


