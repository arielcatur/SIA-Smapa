import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export function JadwalPelajaranWM() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const daysOfWeek = ["senin", "selasa", "rabu", "kamis", "jumat"];

  useEffect(() => {
    // Memanggil API untuk mendapatkan data jadwal
    axios
      .get("http://localhost:3000/api/wali-murid/jadwal-pelajaran", config)
      .then((res) => {
        setData(res.data.data); // Simpan semua data jadwal
      })
      .catch((error) => {
        console.error("Error fetching jadwal:", error);
        setError("Gagal mengambil data jadwal.");
      });
  }, []);

  // Fungsi untuk mendapatkan jadwal per hari
  const getJadwalPerHari = (hari) => {
    return data.filter((item) => item.hari === hari); // Filter jadwal berdasarkan hari
  };

  return (
    <>
      <div className="px-4 py-8">
      <div className="ml-80 flex justify-center mb-6">
        <p className="font-bold text-xl">Jadwal Pelajaran</p>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Container Grid untuk Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-80 gap-8">
        {!error &&
          daysOfWeek.map((hari) => {
            const jadwalHariIni = getJadwalPerHari(hari); // Mendapatkan jadwal untuk hari ini

            return (
              <Card key={hari} className="w-full max-w-sm">
                <CardBody>
                  <Typography variant="h5" color="blue-gray">
                    {hari.charAt(0).toUpperCase() + hari.slice(1)}
                  </Typography>
                </CardBody>

                {jadwalHariIni.length > 0 ? (
                  jadwalHariIni.map((res) => (
                    <CardFooter key={res.id} className="pt-0">
                      <div className="flex justify-between p-2 border-black border-2">
                        <div>{res.mataPelajaran.nama}</div>
                        <div className="bg-cyan-400 px-2 rounded-full text-black">
                          {res.jam}
                        </div>
                      </div>
                    </CardFooter>
                  ))
                ) : (
                  <CardFooter className="p-4">
                    <div className="text-center text-gray-500">
                      Tidak ada jadwal.
                    </div>
                  </CardFooter>
                )}
              </Card>
            );
          })}
      </div>
    </div>
    </>
  );
}
