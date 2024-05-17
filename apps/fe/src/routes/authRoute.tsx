import SignUp from "@/pages/signUp";
import { Route, Routes } from "react-router-dom";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/" Component={SignUp} />
    </Routes>
  );
};

export default AuthRoute;
