import { Typography } from "@material-tailwind/react";
import { PROFILE } from "./Icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-400 ml-80 z-20 top-0 drop-shadow-md">
      <div className="flex justify-between py-6">
        <p className="px-4 font-bold text-white text-xl">Sistem Informasi Akademik</p>
        <div className="flex items-center gap-x-2 p-1 px-4">
          <PROFILE />
          <Link to={"/profilesiswa"} className="flex items-center text-white">
            Ariel Caturputra
          </Link>
        </div>
      </div>
    </nav>
  );
}
