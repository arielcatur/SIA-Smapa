import { Typography } from "@material-tailwind/react";
import { PROFILE } from "../Icons";

export default function Navbar() {
  return (
    <nav className="bg-white ml-80 z-20 top-0 drop-shadow-md">
      <div className="flex justify-between py-6">
        <p className="px-4 font-bold text-xl">Sistem Informasi Akademik</p>
        <div className="flex items-center gap-x-2 p-1 px-4">
            <PROFILE/>
            <a href="#" className="flex items-center">
              Ariel Caturputra
            </a>
        </div>
      </div>
    </nav>
  );
}
