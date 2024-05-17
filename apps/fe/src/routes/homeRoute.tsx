import Dashboard from "@/pages/dashboard";
import { Route, Routes } from "react-router-dom";

const HomeRoute = () => {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
    </Routes>
  );
};

export default HomeRoute;
