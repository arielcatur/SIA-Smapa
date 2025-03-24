import { Card, Typography } from "@material-tailwind/react";
import Search from "../Search";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ARROWRIGHT } from "../Icons";
import { Link } from "react-router-dom";
const TABLE_HEAD = [
  "No",
  "Nama",
  "Biodata",
  "Orang Tua",
  "Nilai UTS",
  "Nilai UAS",
  "Absen",
];

export function WaliKelas() {
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
        console.log(res.data.data);
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
          <p className="pt-2 font-semibold text-base">Kelas XII 1</p>
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
          <tbody>
            {/* {currentData.length > 0 ? (
              currentData.map((res, index) => ( */}
            <tr>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  1{/* {indexOfFirstData + index + 1} */}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                Ariel Catur Putra Kalew
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Link>
                  <button className="bg-black w-8 h-8 border-4 border-black ">
                    <ARROWRIGHT />
                  </button>
                </Link>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Link>
                  <button className="bg-black w-8 h-8 border-4 border-black ">
                    <ARROWRIGHT />
                  </button>
                </Link>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Link>
                  <button className="bg-black w-8 h-8 border-4 border-black ">
                    <ARROWRIGHT />
                  </button>
                </Link>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Link>
                  <button className="bg-black w-8 h-8 border-4 border-black ">
                    <ARROWRIGHT />
                  </button>
                </Link>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Link>
                  <button className="bg-black w-8 h-8 border-4 border-black ">
                    <ARROWRIGHT />
                  </button>
                </Link>
              </td>
            </tr>
            {/* ))
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
            )} */}
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
