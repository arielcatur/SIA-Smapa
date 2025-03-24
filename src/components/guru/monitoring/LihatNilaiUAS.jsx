import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

export function LihatNilaiUAS() {
  const [data, setData] = useState([]);
  const [kelas, setKelas] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableHead, setTableHead] = useState([]); // Dynamic table head
  const dataPerPage = 5;

  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/guru/wali-kelas", config)
      .then((res) => {
        const siswaData = res.data.data.kelas.siswa.map((siswa) => ({
          id: siswa.id,
          nama: siswa.nama,
          nilaiUas: siswa.nilaiUas.map((nilai) => ({
            nilai: nilai.nilai,
            mataPelajaran: nilai.mataPelajaran.nama,
          })),
        }));

        setData(siswaData);

        const kelasData = res.data.data.kelas.nama;
        setKelas(kelasData);

        // Extract and deduplicate subject names for the table head
        const subjects = Array.from(
          new Set(
            siswaData
              .flatMap((siswa) => siswa.nilaiUas)
              .map((nilai) => nilai.mataPelajaran)
          )
        );
        setTableHead(["No", "Nama", ...subjects]); // Include "No" and "Nama" as fixed headers
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
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

  if (data.length === 0) {
    return (
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Anda bukan wali kelas</p>
      </div>
    );
  }

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Nilai UTS</p>
        <div className="mx-4 flex justify-between">
          <p className="pt-2 font-semibold text-base">Kelas {kelas}</p>
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
        <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {tableHead.map((head) => (
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
                  {tableHead.slice(2).map((subject, i) => {
                    const nilai = res.nilaiUas.find(
                      (nilai) => nilai.mataPelajaran === subject
                    );
                    return (
                      <td key={i} className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {nilai ? nilai.nilai : '-'}
                        </Typography>
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHead.length} className="p-4">
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
        </div>
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
