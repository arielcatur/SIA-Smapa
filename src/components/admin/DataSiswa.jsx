import { Card, Typography } from "@material-tailwind/react";
import Search from "../Search";
import DropDown from "../DropDown";
import Plus from "../Plus";

const TABLE_HEAD = [
  "No",
  "Nama",
  "Kelas",
  "NIS",
  "Jenis Kelamin",
  "Tempat Tanggal Lahir",
  "Action",
];

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

export function DataSiswa() {
  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Daftar Siswa</p>
        <div className="mx-4 flex justify-between">
          <p className="pt-2 font-semibold text-base">Daftar Siswa</p>
          <div className="grid grid-cols-[auto_auto] gap-2">
            <Search />
            <Plus />
          </div>
        </div>
      </div>
      <Card className="h-full ml-80 rounded-none">
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
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
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
                      {kelas}
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
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {jk}
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
          <div className="border w-8 bg-blue-gray-200 border-blue-gray-200 text-white text-center pt-2">1</div>
          <button className="border-4 w-20 h-10 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white">
            Next
          </button>
        </div>
      </Card>
    </>
  );
}
