import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

const ProtectedRoute = ({ requiredRole, children }) => {
  // const { state } = useContext(GlobalContext);
  // const { user } = state;

  const token = Cookies.get("token"); 
  const role = Cookies.get("role"); 


  if (!token) {
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
