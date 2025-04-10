import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { Card } from "@material-tailwind/react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);

export function AbsenByAdmin() {
  const { kelasId } = useParams();
  const [siswaData, setSiswaData] = useState([]);
  const [absensiData, setAbsensiData] = useState({});
  const [kelas, setKelas] = useState({});
  const [fetchStatus, setFetchStatus] = useState(true);

  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  // const formatTanggal = (tanggal) => {
  //   const [hari, bulan, tahun] = tanggal.split("-");
  //   const formattedHari = String(hari).padStart(2, "0");
  //   const formattedBulan = String(bulan).padStart(2, "0");
  //   return `${formattedHari}-${formattedBulan}-${tahun}`;
  // };

  useEffect(() => {
    if (fetchStatus) {
      axios
        .get(`http://localhost:3000/api/admin/kelas/${kelasId}`, config)
        .then((res) => {
          // setSiswaData(res.data.data.siswa);
          setKelas(res.data.data);
          return axios.get("http://localhost:3000/api/admin/siswa", config);
        })
        .then((res) => {
          const siswaWithUserId = res.data.data.filter(
            (siswa) => siswa.kelas.id === parseInt(kelasId)
          );
          setSiswaData(siswaWithUserId);
          // console.log("siswa witwh", siswaWithUserId);
        })
        .catch((error) => {
          console.log("Error fetching siswa data:", error);
        });

      // const todayISO = new Date().toISOString().split("T")[0];
      // const today = formatTanggal(todayISO.split("-").reverse().join("-"));
      const today = dayjs().format("D-M-YYYY");

      axios
        .get("http://localhost:3000/api/admin/absensi", config)
        .then((res) => {
          const absensiMap = res.data.data;
          console.log("Data absensi dari API:", absensiMap);
          const filteredData = absensiMap
            .filter((absen) => {
              const formattedTglAbsen = (absen.tglAbsen);
              console.log(`Tanggal Absen: ${formattedTglAbsen}, Tanggal Hari Ini: ${today}`);
              return formattedTglAbsen === today;
            })
            .reduce((acc, curr) => {
              acc[curr.siswa.id] = {
                keterangan: curr.keterangan,
                absenId: curr.id,
              };
              return acc;
            }, {});
            console.log("Data absensi yang sudah difilter:", filteredData);
          setAbsensiData(filteredData);
        })
        .catch((error) => {
          console.log("Error fetching absensi data:", error);
        });

      setFetchStatus(false);
    }
  }, [fetchStatus, kelasId, config]);

  const handleSubmitAbsensi = (siswa, status) => {
    // console.log(`Mengubah absensi untuk ${siswa.nama} menjadi ${status}`);
    const existingAbsensi = absensiData[siswa.id];
    console.log("siswa id", absensiData);
    if (existingAbsensi) {
      axios
        .post(
          `http://localhost:3000/api/admin/absensi/${existingAbsensi.absenId}`,
          {
            keterangan: status,
          },
          config
        )
        .then((response) => {
          // alert("Data absen berhasil diperbarui.");
          alert("Berhasil memperbarui data absensi.");
          setFetchStatus(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Gagal memperbarui data absensi.");
        });
    } else {
      axios
        .post(
          "http://localhost:3000/api/admin/absensi",
          {
            keterangan: status,
            userId: siswa.user.id,
          },
          config
        )
        .then((response) => {
          alert("Data absen berhasil ditambahkan.");
          setFetchStatus(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            `Error: ${error.response?.data?.message || "Terjadi kesalahan"}`
          );
        });
    }
  };

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Absen Siswa</p>
      </div>
      <div className="grid grid-rows-[auto_auto] justify-center ml-80">
        <div className="my-2 justify-self-end">
          <p className="font-semibold">Kelas {kelas.nama}</p>
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
              {siswaData.map((siswa) => (
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
                              checked={
                                absensiData[siswa.id]?.keterangan === status
                              }
                              onChange={() => {
                                // console.log(`Mengubah absensi untuk ${siswa.nama} menjadi ${status}`);
                                handleSubmitAbsensi(siswa, status);
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
        </Card>
      </div>
    </>
  );
}
