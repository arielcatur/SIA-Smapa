import { Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { PLUS } from "../Icons";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

const TABLE_HEAD = [
  "No",
  "Nama",
  "Nama Siswa",
  "No Telp",
  "Alamat",
  "Email",
  "Action",
];

export function DataWaliSiswa() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [data, setData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:3000/api/admin/wali-murid", config)
        .then((res) => {
          setData([...res.data.data]);
        })
        .catch((error) => {});
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.siswa.nama.toLowerCase().includes(searchQuery.toLowerCase())
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
        <p className="flex justify-center font-bold text-xl">
          Daftar Wali Siswa
        </p>
        <div className="mx-4 flex justify-between">
          <p className="pt-2 font-semibold text-base">Daftar Wali Siswa</p>
          <div className="grid grid-cols-[auto_auto] gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border h-[37.6px] border-gray-300 p-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to={"/tambahwali"} className="">
              <button
                type="submit"
                className="w-[40px] h-[37.6px] text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium"
              >
                <PLUS />
              </button>
            </Link>
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
                      {res.siswa.nama}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.noTelp}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.alamat}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.email}
                    </Typography>
                  </td>
                  <td className="grid grid-cols-2 text-white p-4 border-b border-blue-gray-50">
                    <button className="bg-blue-300 border border-white h-8 hover:bg-blue-400">
                      Edit
                    </button>
                    <button className="bg-red-300 border border-white h-8 hover:bg-red-400">
                      Delete
                    </button>
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
