import { Card, Typography } from "@material-tailwind/react";
import Search from "../Search";
import DropDown from "../DropDown";

const TABLE_HEAD = ["Nama", "NIS", "Nilai", "Action"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "80",
    date: "12345678910",
  },
  {
    name: "Alexa Liras",
    job: "80",
    date: "12345678910",
  },
  {
    name: "Laurent Perrier",
    job: "95",
    date: "12345678910",
  },
  {
    name: "Michael Levi",
    job: "100",
    date: "12345678910",
  },
  {
    name: "Richard Gran",
    job: "100",
    date: "12345678910",
  },
];

export function NilaiUtsGuru() {
  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Daftar Siswa</p>
        <div className="my-4 flex justify-center">
          <DropDown />
        </div>
      </div>
      <Card className="h-full ml-80">
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
            {TABLE_ROWS.map(({ name, job, date }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
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
                      {date}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 flex justify-center">
                    <div className="bg-cyan-400 px-2 w-[40px] flex rounded-full text-white justify-center">
                      {job}
                    </div>
                  </td>
                  <td className={classes}>
                    <button
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

