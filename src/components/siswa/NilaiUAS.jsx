// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export function NilaiUAS() {
//   let config = {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//   };

//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Memanggil API untuk mendapatkan data jadwal
//     axios
//       .get("http://localhost:3000/api/wali-murid/nilai-uas", config)
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
//         <p className="flex justify-center font-bold text-xl">Nilai UAS</p>
//       </div>
//       <Card className="ml-96 mt-8 w-96">
//         <CardBody>
//             <Typography variant="h5" color="blue-gray">
//               Nilai UAS
//             </Typography>
//           </CardBody>
//         {data.length > 0 ? (
//           data.map((res) => (
//             <CardFooter className="pt-0">
//               <div className="flex justify-between p-2 border-black border-2">
//                 <div>{res.mataPelajaran.nama}</div>
//                 <div className="bg-cyan-400 px-2 rounded-full text-white">
//                   {res.nilai}
//                 </div>
//               </div>
//             </CardFooter>
//           ))
//         ) : (
//           <CardFooter className="p-4">
//             <div className="text-center text-gray-500">Tidak Nilai</div>
//           </CardFooter>
//         )}
//       </Card>
//     </>
//   );
// }

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export function NilaiUAS() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [semester, setSemester] = useState("Satu / 1");
  const [error, setError] = useState(null);

  // Fetch user's current semester and all data
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/siswa/profile", config)
      .then((res) => {
        const currentSemester = res.data.data.semester; // Format: "Satu / 1"
        setSemester(currentSemester);
        fetchAllNilai(currentSemester);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setError("Gagal mengambil data profile.");
      });
  }, []);

  // Fetch all nilai and filter for current semester
  const fetchAllNilai = (currentSemester) => {
    axios
      .get("http://localhost:3000/api/siswa/nilai-uas", config)
      .then((res) => {
        const data = res.data.data;
        setAllData(data); // Simpan semua data
        filterDataBySemester(data, currentSemester); // Filter data untuk semester awal
      })
      .catch((err) => {
        console.error("Error fetching nilai:", err);
        setError("Gagal mengambil data nilai.");
      });
  };

  // Filter nilai by semester
  const filterDataBySemester = (data, selectedSemester) => {
    const filtered = data.filter(
      (item) => item.semester === selectedSemester
    );
    setFilteredData(filtered);
  };

  // Handle semester change
  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);
    filterDataBySemester(allData, selectedSemester);
  };

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Nilai UAS</p>
      </div>
      <Card className="ml-96 mt-8 w-96">
        <CardBody>
          <div className="flex justify-between items-center">
            <Typography variant="h5" color="blue-gray">
              Nilai UAS
            </Typography>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={semester}
              onChange={handleSemesterChange}
            >
              {["Satu / 1", "Dua / 2", "Tiga / 3", "Empat / 4", "Lima / 5", "Enam / 6"].map(
                (sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                )
              )}
            </select>
          </div>
        </CardBody>
        {filteredData.length > 0 ? (
          filteredData.map((res) => (
            <CardFooter key={res.id} className="pt-0">
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
            <div className="text-center text-gray-500">Tidak ada nilai</div>
          </CardFooter>
        )}
      </Card>
    </>
  );
}