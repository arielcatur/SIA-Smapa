import { PROFILE } from "./Icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const role = Cookies.get("role");
    setUserRole(role)
    const userName = Cookies.get("username");
    setUserName(userName)
  }, []);

  const getProfileLink = () => {
    switch (userRole) {
      case "siswa":
        return "/profilesiswa";
      case "guru":
        return "/profileguru";
      case "wali murid":
        return "/profilewali";
      case "admin":
        return "/profileadmin";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-blue-400 ml-80 z-20 top-0 drop-shadow-md">
      <div className="flex justify-between py-6">
        <p className="px-4 font-bold text-white text-xl">Sistem Informasi Akademik</p>
        <div className="flex items-center gap-x-2 p-1 px-4">
          <PROFILE />
          <Link to={getProfileLink()} className="flex items-center text-white">
          {userName}
          </Link>
        </div>
      </div>
    </nav>
  );
}
