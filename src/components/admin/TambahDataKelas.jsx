import { Card, Typography } from "@material-tailwind/react";
import Search from "../Search";
import DropDown from "../DropDown";
import Plus from "../Plus";
import { PLUS } from "../Icons";
import React from "react";
import {
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Kelas", "Absen", "Action"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    kelas: "XI 1",
    nis: "12345678910",
    jk: "Perempuan",
  },
  {
    name: "Alexa Liras",
    kelas: "XI 1",
    nis: "12345678910",
    jk: "Perempuan",
  },
  {
    name: "Laurent Perrier",
    kelas: "XI 1",
    nis: "12345678910",
    jk: "Perempuan",
  },
  {
    name: "Michael Levi",
    kelas: "XI 1",
    nis: "12345678910",
    jk: "Perempuan",
  },
  {
    name: "Richard Gran",
    kelas: "XI 1",
    nis: "12345678910",
    jk: "Perempuan",
  },
];

export function TambahDataKelas() {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <>
       <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Data Kelas</p>
      </div>
      <div className="grid grid-rows-[auto_auto] justify-center ml-80">
        <div className="my-2 justify-self-end">
          <button onClick={handleOpen} className="border border-blue-gray-300 py-1 px-2 bg-blue-gray-300 text-white hover:bg-white hover:text-blue-gray-300">
            Tambah Kelas
          </button>
        </div>
        <Card className="h-full w-[650px] rounded-none">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, kelas, nis, jk }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4 border-b border-blue-gray-50"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {kelas}
                      </Typography>
                    </td>
                    <td className=" text-white  p-4 border-b border-blue-gray-50">
                      <button className="bg-blue-300 px-2 border border-white h-8 hover:bg-blue-400">
                        Absen
                      </button>
                    </td>
                    <td className="grid grid-cols-2 text-white  p-4 border-b border-blue-gray-50">
                      <button className="bg-blue-300 border border-white h-8 hover:bg-blue-400">
                        Edit
                      </button>
                      <button className="bg-red-300 border border-white h-8 hover:bg-red-400">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-end p-4 ">
            <button className="w-20 h-10 border-4 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white">
              Previous
            </button>
            <div className="border w-8 bg-blue-gray-200 border-blue-gray-200 text-white text-center pt-2">
              1
            </div>
            <button className="border-4 w-20 h-10 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white">
              Next
            </button>
          </div>
        </Card>
      </div> 
      {/* <Button onClick={handleOpen} className=" ml-80">Sign In</Button> */}
      {/* modal */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Tambah Kelas
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nama Kelas
            </Typography>
            <Input label="Nama Kelas" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Angkatan
            </Typography>
            <Input label="Angkatan" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Simpan
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
