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

export function NilaiUTS() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Memanggil API untuk mendapatkan data jadwal
    axios
      .get("http://localhost:3000/api/siswa/nilai-uts", config)
      .then((res) => {
        setData(res.data.data); // Simpan semua data jadwal
      })
      .catch((error) => {
        console.error("Error fetching jadwal:", error);
        setError("Gagal mengambil data jadwal.");
      });
  }, []);

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Nilai UTS</p>
      </div>
      <Card className="ml-96 mt-8 w-96">
        {/* <CardBody>
            <Typography variant="h5" color="blue-gray">
              Senin
            </Typography>
          </CardBody> */}
        {data.length > 0 ? (
          data.map((res) => (
            <CardFooter>
              <div className="flex justify-between p-2 border-black border-2">
                <div>{res.mataPelajaran.nama}</div>
                <div className="bg-cyan-400 px-2 rounded-full text-white">
                  {res.nilai}
                </div>
              </div>
            </CardFooter>
          ))
        ) : (
          <CardFooter className="p-4">
            <div className="text-center text-gray-500">Tidak Nilai</div>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
