import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card } from "@material-tailwind/react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

export function AbsenByGuru() {
  const [siswaData, setSiswaData] = useState([]);
  const [absensiData, setAbsensiData] = useState({});
  const [fetchStatus, setFetchStatus] = useState(true);
  const [kelas, setKelas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const [itemsPerPage] = useState(7); // Jumlah siswa yang ditampilkan per halaman

  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  // Format tanggal
  const today = dayjs().format("D-M-YYYY");

  useEffect(() => {
    if (fetchStatus) {
      // Ambil data siswa dari endpoint yang sesuai untuk guru
      axios
        .get("http://localhost:3000/api/guru/wali-kelas", config)
        .then((res) => {
          const siswaData = res.data.data.kelas.siswa.map((siswa) => ({
            id: siswa.id,
            nama: siswa.nama,
            nis: siswa.nis,
          }));
          setSiswaData(siswaData);
          const kelasData = res.data.data.kelas.nama;
          setKelas(kelasData);
        })
        .catch((error) => {
          console.log("Error fetching siswa data:", error);
        });

      // Ambil data absensi
      axios
        .get("http://localhost:3000/api/admin/absensi", config)
        .then((res) => {
          const absensiMap = res.data.data;

          const filteredData = absensiMap
            .filter((absen) => {
              const formattedTglAbsen = dayjs(
                absen.tglAbsen,
                "D-M-YYYY"
              ).format("D-M-YYYY");
              return formattedTglAbsen === today;
            })
            .reduce((acc, curr) => {
              acc[curr.siswa.id] = {
                keterangan: curr.keterangan,
                absenId: curr.id,
              };
              return acc;
            }, {});

          setAbsensiData(filteredData);
        })
        .catch((error) => {
          console.log("Error fetching absensi data:", error);
        });

      setFetchStatus(false);
    }
  }, [fetchStatus, config]);

  // Menentukan data yang akan ditampilkan pada halaman saat ini
  const indexOfLastSiswa = currentPage * itemsPerPage;
  const indexOfFirstSiswa = indexOfLastSiswa - itemsPerPage;
  const currentSiswa = siswaData.slice(indexOfFirstSiswa, indexOfLastSiswa);

  const handleAbsenChange = (siswa, status) => {
    const existingAbsensi = absensiData[siswa.id];
    if (existingAbsensi) {
      // Update absensi
      axios
        .post(
          `http://localhost:3000/api/guru/wali-kelas/absensi/${existingAbsensi.absenId}`,
          { keterangan: status },
          config
        )
        .then(() => {
          alert("Berhasil memperbarui data absensi.");
          setFetchStatus(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Gagal memperbarui data absensi.");
        });
    } else {
      // Periksa apakah siswa.user ada, jika tidak, ambil dari endpoint api/guru/siswa
      axios
        .get("http://localhost:3000/api/guru/siswa", config)
        .then((res) => {
          const siswaWithUser = res.data.data.find(
            (siswaApi) => siswaApi.id === siswa.id
          );
          const userId = siswaWithUser ? siswaWithUser.user.id : null;
          if (userId) {
            // Create new absensi
            axios
              .post(
                "http://localhost:3000/api/guru/wali-kelas/absensi",
                {
                  keterangan: status,
                  userId: userId,
                },
                config
              )
              .then(() => {
                alert("Berhasil menambahkan data absensi.");
                setFetchStatus(true);
              })
              .catch((error) => {
                console.error("Error:", error);
                alert("Gagal menambahkan data absensi.");
              });
          } else {
            alert("User ID tidak ditemukan untuk siswa ini.");
          }
        })
        .catch((error) => {
          console.error("Error fetching siswa user data:", error);
          alert("Gagal mendapatkan data user untuk siswa.");
        });
    }
  };

  // Fungsi untuk halaman berikutnya
  const handleNextPage = () => {
    if (currentPage < Math.ceil(siswaData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fungsi untuk halaman sebelumnya
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (siswaData.length === 0) {
    return (
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Anda bukan wali kelas</p>
      </div>
    );
  }

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Absensi Siswa</p>
      </div>
      <div className="grid grid-rows-[auto_auto] justify-center ml-80">
        <div className="my-2 justify-self-end">
          <p className="font-semibold">Kelas {kelas}</p>
        </div>
        <Card className="h-full w-[850px] rounded-none">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {["Nama", "NIS", "Absen"].map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentSiswa.map((siswa) => (
                <tr key={siswa.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    {siswa.nama}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {siswa.nis}
                  </td>
                  <td className="border-b border-blue-gray-50 max-w-[180px]">
                    <div className="flex gap-2">
                      {["Hadir", "Izin", "Sakit", "Alpa"].map((status) => (
                        <div key={status} className="inline-flex items-center">
                          <label className="relative flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`absen-${siswa.id}`}
                              className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                              checked={absensiData[siswa.id]?.keterangan === status}
                              onChange={() => {
                                handleAbsenChange(siswa, status);
                              }}
                            />
                            <span className="absolute bg-blue-600 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                          </label>
                          <label className="ml-2 text-slate-600 cursor-pointer text-sm">
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
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
      </div>
    </>
  );
}
