// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
// } from "@material-tailwind/react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";

// dayjs.extend(customParseFormat);

// export function HomeWali() {
//   let config = {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//   };

//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/wali-murid/absensi", config)
//       .then((res) => {
//         const today = dayjs().format("D-M-YYYY");
//         const filteredData = res.data.data.filter((absen) => {
//           return dayjs(absen.tglAbsen, "D-M-YYYY").format("D-M-YYYY") === today;
//         });
//         setData(filteredData);
//         // console.log(filteredData);
//       })
//       .catch((error) => {
//         console.error("Error fetching absensi:", error);
//         setError("Gagal mengambil data absensi.");
//       });
//   }, []);

//   return (
//     <Card className="ml-96 mt-8 w-96">
//       <CardBody>
//         <Typography variant="h5" color="blue-gray" className="mb-2">
//           Absen Anak Hari ini
//         </Typography>
//       </CardBody>
//       {data.length > 0 ? (
//         data.map((res) => (
//           <CardFooter className="pt-0" key={res.id}>
//             <div className="py-1 text-center font-bold w-[100px] rounded-lg bg-transparent text-blue-300 border-2 border-blue-300">
//               {res.keterangan}
//             </div>
//           </CardFooter>
//         ))
//       ) : (
//         <CardFooter className="p-4">
//           <div className="text-center text-gray-500">Anak Belum Absen</div>
//         </CardFooter>
//       )}
//     </Card>
//   );
// }

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function HomeWali() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [data, setData] = useState([]); // Data absensi siswa
  const [waliData, setWaliData] = useState(null); // Data wali kelas
  const [error, setError] = useState(null); // Error handling

  // Mengambil data absensi siswa
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/wali-murid/absensi", config)
      .then((res) => {
        const today = dayjs().format("D-M-YYYY");
        const filteredData = res.data.data.filter((absen) => {
          return dayjs(absen.tglAbsen, "D-M-YYYY").format("D-M-YYYY") === today;
        });
        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching absensi:", error);
        setError("Gagal mengambil data absensi.");
      });
  }, []);

  // Mengambil data wali kelas
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/wali-murid/wali-kelas", config)
      .then((res) => {
        setWaliData(res.data.data.guru);
      })
      .catch((error) => {
        console.error("Error fetching data wali kelas:", error);
        setError("Gagal mengambil data wali kelas.");
      });
  }, []);

  return (
    <>
      {/* Card Absensi */}
      <Card className="ml-96 mt-8 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Absen Anak Hari ini
          </Typography>
        </CardBody>
        {data.length > 0 ? (
          data.map((res) => (
            <CardFooter className="pt-0" key={res.id}>
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

      {/* Card Informasi Wali Kelas */}
      {waliData && (
        <Card className="ml-96 mt-4 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Informasi Wali Kelas
            </Typography>
            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="font-bold">
                Nama:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.nama}
              </Typography>
            </div>
            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="font-bold">
                TTL:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.ttl}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="font-bold">
                Jenis Kelamin:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.jk}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="font-bold">
                Agama:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.agama}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="font-bold">
                No. Telepon:
              </Typography>
              <Typography variant="small" color="gray">
                {waliData.noTelp}
              </Typography>
            </div>

            <div className="mb-2">
              <Typography variant="small" color="blue-gray" className="font-bold">
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
