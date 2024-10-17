// import { Select, Option } from "@material-tailwind/react";

export default function SelectDefault() {
  return (
    <>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-1/2 p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
        type="text"
        list="role"
      />
      <datalist id="role" label="Select Your Role">
        <option>Siswa</option>
        <option>Guru</option>
        <option>Orangtua Siswa</option>
        <option>Admin</option>
      </datalist>
    </>
    // <div className="w-[184px] border border-gray-300  bg-gray-50 rounded-lg">
    // </div>
  );
}
