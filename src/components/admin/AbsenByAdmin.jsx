import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import {
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Nama", "NIS", "Absen"];

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

export function AbsenByAdmin() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Absen Siswa</p>
      </div>
      <div className="grid grid-rows-[auto_auto] justify-center ml-80">
        <div className="my-2 justify-self-end">
          <p>Kelas XI 1</p>
        </div>
        <Card className="h-full w-[750px] rounded-none">
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
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nis}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 max-w-[180px]">
                      <div className="flex gap-2">
                        <div className="inline-flex items-center">
                          <label
                            className="relative flex items-center cursor-pointer"
                            htmlFor="html"
                          >
                            <input
                              name="framework"
                              type="radio"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                              id="html"
                            />
                            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                          </label>
                          <label
                            className="ml-2 text-slate-600 cursor-pointer text-sm"
                            htmlFor="html"
                          >
                            Hadir
                          </label>
                        </div>
                        <div className="inline-flex items-center">
                          <label
                            className="relative flex items-center cursor-pointer"
                            htmlFor="react"
                          >
                            <input
                              name="framework"
                              type="radio"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                              id="react"
                              defaultChecked
                            />
                            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                          </label>
                          <label
                            className="ml-2 text-slate-600 cursor-pointer text-sm"
                            htmlFor="react"
                          >
                            Izin
                          </label>
                        </div>
                        <div className="inline-flex items-center">
                          <label
                            className="relative flex items-center cursor-pointer"
                            htmlFor="react"
                          >
                            <input
                              name="framework"
                              type="radio"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                              id="react"
                              defaultChecked
                            />
                            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                          </label>
                          <label
                            className="ml-2 text-slate-600 cursor-pointer text-sm"
                            htmlFor="react"
                          >
                            Sakit
                          </label>
                        </div>
                        <div className="inline-flex items-center">
                          <label
                            className="relative flex items-center cursor-pointer"
                            htmlFor="react"
                          >
                            <input
                              name="framework"
                              type="radio"
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                              id="react"
                              defaultChecked
                            />
                            <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                          </label>
                          <label
                            className="ml-2 text-slate-600 cursor-pointer text-sm"
                            htmlFor="react"
                          >
                            Tidak Hadir
                          </label>
                        </div>
                      </div>
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
