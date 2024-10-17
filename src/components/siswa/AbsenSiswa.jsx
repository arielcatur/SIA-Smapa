// import {
//     Card,
//     CardBody,
//     CardFooter,
//     Typography,
//     Button,
//   } from "@material-tailwind/react";
   
//   export function AbsenSiswa() {
//     return (
//       <Card className="ml-96 mt-8 w-96">
//         <CardBody>
//           <Typography variant="h5" color="blue-gray" className="mb-2">
//             Absen Untuk Hari ini
//           </Typography>
//         </CardBody>
//         <CardFooter className="pt-0">
//           <Button className="mx-1 w-[82px] bg-transparent text-blue-300 border-2 border-blue-300 hover:bg-blue-400 hover:text-white">Hadir</Button>
//           <Button className="mx-1 w-[82px] bg-transparent text-yellow-300 border-2 border-yellow-300 hover:bg-yellow-400 hover:text-white">Izin</Button>
//           <Button className="mx-1 w-[82px] bg-transparent text-red-300 border-2 border-red-300 hover:bg-red-400 hover:text-white">Sakit</Button>
//         </CardFooter>
//       </Card>
//     );
//   }

// import { useState, useEffect } from "react";
// import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
// import axios from "axios";
// import Cookies from "js-cookie";

// export function AbsenSiswa() {
//   const [absenStatus, setAbsenStatus] = useState(""); // Menyimpan status absen siswa
//   const [isDisabled, setIsDisabled] = useState(false); // Menonaktifkan tombol setelah absen

//   useEffect(() => {
//     // Mengecek apakah siswa sudah melakukan absen
//     const token = Cookies.get("token");
//     axios
//       .get("http://localhost:3000/api/siswa/absensi/status", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         if (response.data.status) {
//           setAbsenStatus(response.data.keterangan); // Set keterangan absen (hadir, izin, sakit)
//           setIsDisabled(true); // Nonaktifkan tombol jika sudah absen
//         }
//       })
//       .catch((error) => {
//         console.error("Error checking attendance status:", error);
//       });
//   }, []);

//   const handleAbsen = (keterangan) => {
//     const token = Cookies.get("token");

//     axios
//       .post(
//         "http://localhost:3000/api/siswa/absensi",
//         { keterangan }, // Body request
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setAbsenStatus(keterangan); // Set status absen berdasarkan keterangan yang dipilih
//         setIsDisabled(true); // Menonaktifkan tombol setelah absen berhasil
//       })
//       .catch((error) => {
//         console.error("Error submitting attendance:", error);
//       });
//   };

//   return (
//     <Card className="ml-96 mt-8 w-96">
//       <CardBody>
//         <Typography variant="h5" color="blue-gray" className="mb-2">
//           Absen Untuk Hari ini
//         </Typography>
//       </CardBody>
//       <CardFooter className="pt-0">
//         <Button
//           className={`mx-1 w-[82px] ${absenStatus === "hadir" ? "bg-blue-400 text-white" : "bg-transparent text-blue-300 border-2 border-blue-300 hover:bg-blue-400 hover:text-white"}`}
//           onClick={() => handleAbsen("hadir")}
//           disabled={isDisabled} // Menonaktifkan tombol jika sudah absen
//         >
//           Hadir
//         </Button>
//         <Button
//           className={`mx-1 w-[82px] ${absenStatus === "izin" ? "bg-yellow-400 text-white" : "bg-transparent text-yellow-300 border-2 border-yellow-300 hover:bg-yellow-400 hover:text-white"}`}
//           onClick={() => handleAbsen("izin")}
//           disabled={isDisabled} // Menonaktifkan tombol jika sudah absen
//         >
//           Izin
//         </Button>
//         <Button
//           className={`mx-1 w-[82px] ${absenStatus === "sakit" ? "bg-red-400 text-white" : "bg-transparent text-red-300 border-2 border-red-300 hover:bg-red-400 hover:text-white"}`}
//           onClick={() => handleAbsen("sakit")}
//           disabled={isDisabled} // Menonaktifkan tombol jika sudah absen
//         >
//           Sakit
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";

export function AbsenSiswa() {
  const [absenStatus, setAbsenStatus] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isWithinTime, setIsWithinTime] = useState(false);
  const [timeMessage, setTimeMessage] = useState("");

  const checkTime = () => {
    const currentTime = new Date();
    const startTime = new Date();
    const endTime = new Date();


    startTime.setHours(7, 30, 0, 0);
    endTime.setHours(16, 0, 0, 0);

    if (currentTime >= startTime && currentTime <= endTime) {
      setIsWithinTime(true);
    } else {
      setIsWithinTime(false);
      setTimeMessage("Absensi hanya dapat dilakukan dari jam 07:30 hingga 16:00.");
    }
  };

  useEffect(() => {
    checkTime();

    const token = Cookies.get("token");
    axios
      .get("http://localhost:3000/api/siswa/absensi/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status && response.data.today) { 
          setAbsenStatus(response.data.keterangan);
          setIsDisabled(true);
        }
      })
      .catch((error) => {
        console.error("Error checking attendance status:", error);
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
        setAbsenStatus(keterangan);
        setIsDisabled(true);
      })
      .catch((error) => {
        console.error("Error submitting attendance:", error);
      });
  };

  return (
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
          className={`mx-1 w-[82px] ${absenStatus === "hadir" ? "bg-blue-400 text-white" : "bg-transparent text-blue-300 border-2 border-blue-300 hover:bg-blue-400 hover:text-white"}`}
          onClick={() => handleAbsen("hadir")}
          disabled={isDisabled || !isWithinTime}
        >
          Hadir
        </Button>
        <Button
          className={`mx-1 w-[82px] ${absenStatus === "izin" ? "bg-yellow-400 text-white" : "bg-transparent text-yellow-300 border-2 border-yellow-300 hover:bg-yellow-400 hover:text-white"}`}
          onClick={() => handleAbsen("izin")}
          disabled={isDisabled || !isWithinTime}
        >
          Izin
        </Button>
        <Button
          className={`mx-1 w-[82px] ${absenStatus === "sakit" ? "bg-red-400 text-white" : "bg-transparent text-red-300 border-2 border-red-300 hover:bg-red-400 hover:text-white"}`}
          onClick={() => handleAbsen("sakit")}
          disabled={isDisabled || !isWithinTime}
        >
          Sakit
        </Button>
      </CardFooter>
    </Card>
  );
}
