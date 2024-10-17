import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

export function HomeWali() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/wali-murid/absensi", config)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching jadwal:", error);
        setError("Gagal mengambil data jadwal.");
      });
  }, []);

  return (
    <Card className="ml-96 mt-8 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Absen Anak Hari ini
        </Typography>
      </CardBody>
      {data.length > 0 ? (
        data.map((res) => (
          <CardFooter className="pt-0">
            <div className="py-1 text-center font-bold w-[100px] rounded-lg bg-transparent text-blue-300 border-2 border-blue-300">
              {res.keterangan}
            </div>
          </CardFooter>
        ))
      ) : (
        <CardFooter className="p-4">
          <div className="text-center text-gray-500">Anak Belum Absen</div>
        </CardFooter>
      )}
    </Card>
  );
}
