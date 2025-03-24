// import { Card, Typography } from "@material-tailwind/react";

// const TABLE_HEAD = ["No", "Hari", "Tanggal", "Semester",  "Keterangan"];

// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useContext, useEffect, useState } from "react";

// export function DataAbsensiWM() {
//   let config = {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//   };
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   // const [fetchStatus, setFetchStatus] = useState(true);
//   useEffect(() => {
//     // Memanggil API untuk mendapatkan data jadwal
//     axios
//       .get("http://localhost:3000/api/wali-murid/absensi", config)
//       .then((res) => {
//         setData(res.data.data); // Simpan semua data jadwal
//       })
//       .catch((error) => {
//         console.error("Error fetching jadwal:", error);
//         setError("Gagal mengambil data jadwal.");
//       });
//   }, []);

//   return (
//     <>
//       <div className="ml-80 py-4">
//         <p className="flex justify-center font-bold text-xl">Data Absensi</p>
//         {/* <div className="mx-4 flex justify-between">
//           <p className="pt-2 font-semibold text-base">Data Absensi</p>
//           <DropDown />
//         </div> */}
//       </div>
//       <Card className="h-full ml-80 rounded-none">
//         <table className="w-full min-w-max table-auto text-center">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head) => (
//                 <th
//                   key={head}
//                   className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal leading-none opacity-70"
//                   >
//                     {head}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//           {data !== null &&
//                 data.map((res, index) => {
//               const isLast = index === res.id.length - 1;
//               const classes = isLast
//                 ? "p-4"
//                 : "p-4 border-b border-blue-gray-50";

//               return (
//                 <tr key={res.id}>
//                   <td className={classes}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {index + 1}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {res.hariAbsen}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {res.tglAbsen}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {res.semester}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {res.keterangan}
//                     </Typography>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </Card>
//     </>
//   );
// }

import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const TABLE_HEAD = ["No", "Hari", "Tanggal", "Semester", "Keterangan"];

export function DataAbsensiWM() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [data, setData] = useState([]); // Data absensi yang sudah difilter
  const [allData, setAllData] = useState([]); // Data absensi tanpa filter
  const [semester, setSemester] = useState("Semua Semester"); // Semester yang dipilih
  const [error, setError] = useState(null);

  // Fetch semua data absensi
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/wali-murid/absensi", config)
      .then((res) => {
        const fetchedData = res.data.data;
        setAllData(fetchedData);
        filterDataBySemester(fetchedData, semester); // Filter data saat pertama kali load
      })
      .catch((error) => {
        console.error("Error fetching jadwal:", error);
        setError("Gagal mengambil data jadwal.");
      });
  }, []); // Hanya jalankan sekali saat component mount

  // Filter data absensi berdasarkan semester
  const filterDataBySemester = (data, selectedSemester) => {
    if (selectedSemester === "Semua Semester") {
      setData(data); // Tampilkan semua data jika "Semua Semester" dipilih
    } else {
      const filtered = data.filter((item) => item.semester === selectedSemester);
      setData(filtered); // Filter data berdasarkan semester yang dipilih
    }
  };

  // Handle perubahan semester
  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);
    filterDataBySemester(allData, selectedSemester); // Filter ulang data berdasarkan semester yang dipilih
  };

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Data Absensi</p>
      </div>

      <Card className="h-full ml-80 rounded-none">
        <div className="flex justify-end p-4">
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={semester}
            onChange={handleSemesterChange}
          >
            <option value="Semua Semester">Semua Semester</option> {/* Menambahkan opsi "Semua Semester" */}
            {["Satu / 1", "Dua / 2", "Tiga / 3", "Empat / 4", "Lima / 5", "Enam / 6"].map(
              (sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              )
            )}
          </select>
        </div>

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
            {data.length > 0 ? (
              data.map((res, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={res.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {res.hariAbsen}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {res.tglAbsen}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {res.semester}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {res.keterangan}
                      </Typography>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  <Typography variant="small" color="gray">
                    Tidak ada data absensi untuk semester ini.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}



