import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  alert,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export function AbsenSiswa() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [absenStatus, setAbsenStatus] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isWithinTime, setIsWithinTime] = useState(false);
  const [timeMessage, setTimeMessage] = useState("");
  const [waliData, setWaliData] = useState(null);

  const checkTime = () => {
    const currentTime = new Date();
    // console.log(currentTime)
    const startTime = new Date();
    // console.log(startTime)
    const endTime = new Date();
    // console.log(endTime)

    startTime.setHours(7, 30, 0, 0);
    endTime.setHours(16, 0, 0, 0);

    if (currentTime >= startTime && currentTime <= endTime) {
      setIsWithinTime(true);
    } else {
      setIsWithinTime(false);
      setIsDisabled(true);
      // setTimeMessage("Absensi hanya dapat dilakukan dari jam 07:30 hingga 16:00.");
    }
  };

  useEffect(() => {
    checkTime();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/siswa/wali-kelas", config)
      .then((res) => {
        setWaliData(res.data.data.guru);
      })
      .catch((error) => {
        console.error("Error fetching data wali kelas:", error);
        setError("Gagal mengambil data wali kelas.");
      });
  }, []);

  const handleAbsen = (keterangan) => {
    const token = Cookies.get("token");

    axios
      .post(
        "http://localhost:3000/api/siswa/absensi",
        { keterangan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: `${keterangan}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setAbsenStatus(keterangan);
        setIsDisabled(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
        // console.error(`Error: ${error.response.data.message || "Terjadi kesalahan"}`);
        setIsDisabled(true);
        // alert(`Error: ${error.response?.data?.message || "Terjadi kesalahan"}`);
      });
  };

  return (
    <>
      <Card className="ml-96 mt-8 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Absen Untuk Hari ini
          </Typography>
          {!isWithinTime && (
            <Typography variant="small" color="red" className="mb-2">
              {timeMessage}
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className={`mx-1 w-[82px] ${
              absenStatus === "Hadir"
                ? "bg-blue-400 text-white"
                : "bg-transparent text-blue-300 border-2 border-blue-300 hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => handleAbsen("Hadir")}
            disabled={isDisabled || !isWithinTime}
          >
            Hadir
          </Button>
          <Button
            className={`mx-1 w-[82px] ${
              absenStatus === "Izin"
                ? "bg-yellow-400 text-white"
                : "bg-transparent text-yellow-300 border-2 border-yellow-300 hover:bg-yellow-400 hover:text-white"
            }`}
            onClick={() => handleAbsen("Izin")}
            disabled={isDisabled || !isWithinTime}
          >
            Izin
          </Button>
          <Button
            className={`mx-1 w-[82px] ${
              absenStatus === "Sakit"
                ? "bg-red-400 text-white"
                : "bg-transparent text-red-300 border-2 border-red-300 hover:bg-red-400 hover:text-white"
            }`}
            onClick={() => handleAbsen("Sakit")}
            disabled={isDisabled || !isWithinTime}
          >
            Sakit
          </Button>
        </CardFooter>
      </Card>

      {waliData && (
        <Card className="ml-96 mt-4 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Informasi Wali Kelas
            </Typography>
            <div className="mb-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                Nama:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.nama}
              </Typography>
            </div>
            <div className="mb-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                TTL:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.ttl}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                Jenis Kelamin:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.jk}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                Agama:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.agama}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                No. Telepon:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.noTelp}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                Alamat:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.alamat}
              </Typography>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
