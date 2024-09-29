import { Select, Option } from "@material-tailwind/react";
 
export default function DropDown() {
  return (
    <div className="w-52">
      <Select label="Pilih Bulan">
        <Option>Januari</Option>
        <Option>Februari</Option>
        <Option>Maret</Option>
        <Option>April</Option>
        <Option>Mei</Option>
      </Select>
    </div>
  );
}