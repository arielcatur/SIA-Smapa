import { Card, Typography } from "@material-tailwind/react";
import Search from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

const TABLE_HEAD = [
  "No",
  "Nama",
  "Agama",
  "NIP",
  "Jenis Kelamin",
  "Tempat Tanggal Lahir",
];

export function DaftarSiswa() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/guru/siswa", config)
      .then((res) => {
        setData([...res.data.data]);
      })
      .catch((error) => {});
  }, []);

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / dataPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Daftar Siswa</p>
        <div className="mx-4 flex justify-between">
          <p className="pt-2 font-semibold text-base">Daftar Siswa</p>
          <input
            type="text"
            placeholder="Cari Nama Siswa..."
            className="border h-[37.6px] border-gray-300 p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
          {/* <tbody>
          {data !== null &&
              data.map((res, index) => {
              const isLast = index === res.id.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={res.id}>
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
                      {res.nama}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.agama}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.nis}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.jk}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.ttl}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody> */}
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((res, index) => (
                <tr key={res.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {indexOfFirstData + index + 1}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {res.nama}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.agama}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.nis}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.jk}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.ttl}
                    </Typography>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Tidak ada data yang ditemukan.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-end p-4">
          <button
            onClick={handlePreviousPage}
            className="w-20 h-10 border-4 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white"
          >
            Previous
          </button>
          <div className="border w-8 bg-blue-gray-200 border-blue-gray-200 text-white text-center pt-2">
            {currentPage}
          </div>
          <button
            onClick={handleNextPage}
            className="w-20 h-10 border-4 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white"
          >
            Next
          </button>
        </div>
      </Card>
    </>
  );
}
