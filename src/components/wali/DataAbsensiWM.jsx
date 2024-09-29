import { Card, Typography } from "@material-tailwind/react";
import DropDown from "../DropDown";

const TABLE_HEAD = [
  "No",
  "Tanggal",
  "Hari",
  "Keterangan",
];

const TABLE_ROWS = [
  {
    tanggal: "01-01-2024",
    hari: "Senin",
    keterangan: "hadir",
  },
  {
    tanggal: "01-01-2024",
    hari: "Senin",
    keterangan: "hadir",
  },
  {
    tanggal: "01-01-2024",
    hari: "Senin",
    keterangan: "hadir",
  },
  {
    tanggal: "01-01-2024",
    hari: "Senin",
    keterangan: "hadir",
  },
  {
    tanggal: "01-01-2024",
    hari: "Senin",
    keterangan: "hadir",
  },
  
];

export function DataAbsensiWM() {
  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">
          Data Absensi
        </p>
        <div className="mx-4 flex justify-between">
            <p className="pt-2 font-semibold text-base">Data Absensi</p>
            <DropDown/>
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
            {TABLE_ROWS.map(({ tanggal, hari, keterangan }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={tanggal}>
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
                      className="font-normal"
                    >
                      {tanggal}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {hari}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {keterangan}
                    </Typography>
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
