import { Select, Option } from "@material-tailwind/react";
 
export default function SelectDefault() {
  return (
    <div className="w-72">
      <Select label="Select Your Role">
        <Option>Siswa</Option>
        <Option>Guru</Option>
        <Option>Orangtua Siswa</Option>
        <Option>Admin</Option>
      </Select>
    </div>
  );
}