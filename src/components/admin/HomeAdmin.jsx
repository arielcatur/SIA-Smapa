// import {
//   Card,
//   CardBody,
//   Typography,
//   CardHeader,
// } from "@material-tailwind/react";
// import { useState, useEffect, useContext } from "react";
// // import { GlobalContext } from "../../context/GlobalContext";
// import Chart from "react-apexcharts";

// const chartConfig = {
//   type: "bar",
//   height: 240,
//   series: [
//     {
//       name: "Sales",
//       data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
//     },
//   ],
//   options: {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//     },
//     title: {
//       show: "",
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     colors: ["#020617"],
//     plotOptions: {
//       bar: {
//         columnWidth: "40%",
//         borderRadius: 2,
//       },
//     },
//     xaxis: {
//       axisTicks: {
//         show: false,
//       },
//       axisBorder: {
//         show: false,
//       },
//       labels: {
//         style: {
//           colors: "#616161",
//           fontSize: "12px",
//           fontFamily: "inherit",
//           fontWeight: 400,
//         },
//       },
//       categories: [
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ],
//     },
//     yaxis: {
//       labels: {
//         style: {
//           colors: "#616161",
//           fontSize: "12px",
//           fontFamily: "inherit",
//           fontWeight: 400,
//         },
//       },
//     },
//     grid: {
//       show: true,
//       borderColor: "#dddddd",
//       strokeDashArray: 5,
//       xaxis: {
//         lines: {
//           show: true,
//         },
//       },
//       padding: {
//         top: 5,
//         right: 20,
//       },
//     },
//     fill: {
//       opacity: 0.8,
//     },
//     tooltip: {
//       theme: "dark",
//     },
//   },
// };

// export function HomeAdmin() {
//   // const { state } = useContext(GlobalContext);
//   // const { token } = state;
//   const [currentDate, setCurrentDate] = useState("");
//   const [nilaiUts, setNullaiUts] = useState("");

//   useEffect(() => {
//     const today = new Date();
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     const formattedDate = today.toLocaleDateString("id-ID", options);
//     setCurrentDate(formattedDate);
//   }, []);

//   return (
//     <div className="ml-96 grid grid-rows2 gap-8">
//       <Card className="mt-8 w-96 h-36">
//         <CardBody>
//           <Typography
//             color="blue-gray"
//             className="font-normal mb-2 flex justify-end"
//           >
//             {currentDate}
//           </Typography>
//           <Typography
//             variant="h5"
//             color="blue-gray"
//             className="mt-3 flex items-center"
//           >
//             Selamat Datang Admin
//           </Typography>
//         </CardBody>
//       </Card>
//       <div className="grid grid-cols-2 gap-8">
//         <Card className="">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="flex justify-between gap-4 rounded-none"
//           >
//             <Typography variant="h5" color="blue-gray">
//               Nilai UTS
//             </Typography>
//             <select
//               label="Pilih Mata Pelajaran"
//               className="w-30 border-2 border-gray-900 p-1 rounded flex justify-end"
//             >
//               <option value="">Pilih Mata Pelajaran</option>
//             </select>
//           </CardHeader>
//           <CardBody className="p-0">
//             <Chart {...chartConfig} />
//           </CardBody>
//         </Card>
//         <Card className="mr-14">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="flex justify-between gap-4 rounded-none"
//           >
//             <Typography variant="h5" color="blue-gray">
//               Nilai UAS
//             </Typography>
//             <select
//               label="Pilih Mata Pelajaran"
//               className="w-30 border-2 border-gray-900 p-1 rounded flex justify-end"
//             >
//               <option value="">Pilih Mata Pelajaran</option>
//             </select>
//           </CardHeader>
//           <CardBody className="p-0">
//             <Chart {...chartConfig} />
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// }

// import {
//   Card,
//   CardBody,
//   Typography,
//   CardHeader,
// } from "@material-tailwind/react";
// import { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import axios from "axios";
// import Cookies from "js-cookie";

// export function HomeAdmin() {
//   let config = {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("token")}`,
//     },
//   };
//   const [currentDate, setCurrentDate] = useState("");
//   const [nilaiUts, setNilaiUts] = useState([]);
//   const [nilaiUas, setNilaiUas] = useState([]);
//   const [kelasCategories, setKelasCategories] = useState([]);

//   const calculateAverage = (data) => {
//     const groupedData = data.reduce((acc, item) => {
//       const { nama: kelasNama } = item.kelas;
//       if (!acc[kelasNama]) acc[kelasNama] = [];
//       acc[kelasNama].push(item.nilai);
//       return acc;
//     }, {});

//     const kelasNames = Object.keys(groupedData);
//     const averages = kelasNames.map(
//       (kelasNama) =>
//         (
//           groupedData[kelasNama].reduce((sum, nilai) => sum + nilai, 0) /
//           groupedData[kelasNama].length
//         ).toFixed(2) // Membulatkan rata-rata ke 2 angka di belakang koma
//     );

//     setKelasCategories(kelasNames); // Set x-axis categories dengan nama kelas
//     return [{ name: "Rata-rata Nilai", data: averages }];
//   };

//   const fetchNilaiUts = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/admin/nilai-uts", config
//       );
//       setNilaiUts(calculateAverage(response.data.data));
//     } catch (error) {
//       console.error("Error fetching nilai UTS:", error);
//     }
//   };

//   const fetchNilaiUas = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/admin/nilai-uas", config
//       );
//       setNilaiUas(calculateAverage(response.data.data));
//     } catch (error) {
//       console.error("Error fetching nilai UAS:", error);
//     }
//   };

//   useEffect(() => {
//     const today = new Date();
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     const formattedDate = today.toLocaleDateString("id-ID", options);
//     setCurrentDate(formattedDate);

//     fetchNilaiUts();
//     fetchNilaiUas();
//   }, []);

//   const chartOptions = {
//     chart: {
//       type: "bar",
//       height: 240,
//       toolbar: { show: false },
//     },
//     plotOptions: {
//       bar: { columnWidth: "40%", borderRadius: 2 },
//     },
//     xaxis: {
//       categories: kelasCategories, // Menampilkan nama kelas di x-axis
//       labels: { style: { colors: "#616161", fontSize: "12px" } },
//     },
//     yaxis: {
//       min: 0,
//       max: 100,
//       tickAmount: 5,
//       labels: { style: { colors: "#616161", fontSize: "12px" } },
//     },
//     grid: {
//       borderColor: "#dddddd",
//       strokeDashArray: 5,
//       padding: { top: 5, right: 20 },
//     },
//     fill: { opacity: 0.8 },
//     tooltip: { theme: "dark" },
//     colors: ["#020617"],
//   };

//   return (
//     <div className="ml-96 grid grid-rows2 gap-8">
//       <Card className="mt-8 w-96 h-36">
//         <CardBody>
//           <Typography
//             color="blue-gray"
//             className="font-normal mb-2 flex justify-end"
//           >
//             {currentDate}
//           </Typography>
//           <Typography
//             variant="h5"
//             color="blue-gray"
//             className="mt-3 flex items-center"
//           >
//             Selamat Datang Admin
//           </Typography>
//         </CardBody>
//       </Card>
//       <div className="grid grid-cols-2 gap-8">
//         <Card className="">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="flex justify-between gap-4 rounded-none"
//           >
//             <Typography variant="h5" color="blue-gray">
//               Nilai UTS
//             </Typography>
//             <select
//               label="Pilih Mata Pelajaran"
//               className="w-30 border-2 border-gray-900 p-1 rounded flex justify-end"
//             >
//               <option value="">Pilih Mata Pelajaran</option>
//             </select>
//           </CardHeader>
//           <CardBody className="p-0">
//             <Chart
//               options={chartOptions}
//               series={nilaiUts}
//               type="bar"
//               height={240}
//             />
//           </CardBody>
//         </Card>
//         <Card className="mr-14">
//           <CardHeader
//             floated={false}
//             shadow={false}
//             color="transparent"
//             className="flex justify-between gap-4 rounded-none"
//           >
//             <Typography variant="h5" color="blue-gray">
//               Nilai UAS
//             </Typography>
//             <select
//               label="Pilih Mata Pelajaran"
//               className="w-30 border-2 border-gray-900 p-1 rounded flex justify-end"
//             >
//               <option value="">Pilih Mata Pelajaran</option>
//             </select>
//           </CardHeader>
//           <CardBody className="p-0">
//             <Chart
//               options={chartOptions}
//               series={nilaiUas}
//               type="bar"
//               height={240}
//             />
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// }

import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import Cookies from "js-cookie";

export function HomeAdmin() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [currentDate, setCurrentDate] = useState("");
  const [nilaiUts, setNilaiUts] = useState([]);
  const [nilaiUas, setNilaiUas] = useState([]);
  const [kelasCategories, setKelasCategories] = useState([]);
  const [mataPelajaran, setMataPelajaran] = useState([]);
  const [selectedMatpelUts, setSelectedMatpelUts] = useState("");
  const [selectedMatpelUas, setSelectedMatpelUas] = useState("");

  const calculateAverage = (data, matpelId) => {
    if (!data || data.length === 0) {
      return [{ name: "Rata-rata Nilai", data: [] }];
    }

    if (!matpelId) {
      const kelasGroupedById = {};

      // Kelompokkan data berdasarkan kelas.id
      data.forEach((item) => {
        const kelasId = item.kelas.id;
        const kelasNama = item.kelas.nama;
        const matpelId = item.mataPelajaran.id;

        if (!kelasGroupedById[kelasId]) {
          kelasGroupedById[kelasId] = {
            nama: kelasNama,
            nilai: {},
            id: kelasId,
          };
        }

        if (!kelasGroupedById[kelasId].nilai[matpelId]) {
          kelasGroupedById[kelasId].nilai[matpelId] = [];
        }

        kelasGroupedById[kelasId].nilai[matpelId].push(item.nilai);
      });

      const kelasAverages = [];
      for (const kelasId in kelasGroupedById) {
        const kelasData = kelasGroupedById[kelasId];
        const matpelAverages = [];

        for (const matpelId in kelasData.nilai) {
          const nilaiMatpel = kelasData.nilai[matpelId];
          const matpelAverage =
            nilaiMatpel.reduce((sum, nilai) => sum + nilai, 0) /
            nilaiMatpel.length;
          matpelAverages.push(matpelAverage);
        }

        const kelasAverage =
          matpelAverages.reduce((sum, avg) => sum + avg, 0) /
          matpelAverages.length;

        // Simpan rata-rata beserta nama dan id kelas
        kelasAverages.push({
          nama: kelasData.nama,
          average: kelasAverage.toFixed(2),
          id: kelasData.id,
        });
      }

      // Urutkan berdasarkan id kelas
      kelasAverages.sort((a, b) => a.id - b.id);

      const sortedKelasNames = kelasAverages.map((item) => item.nama);
      const averages = kelasAverages.map((item) => item.average);

      setKelasCategories(sortedKelasNames);
      return [{ name: "Rata-rata Nilai", data: averages }];
    } else {
      const filteredData = data.filter(
        (item) => item.mataPelajaran && item.mataPelajaran.id === matpelId
      );

      const groupedData = filteredData.reduce((acc, item) => {
        const kelasId = item.kelas.id;
        const kelasNama = item.kelas.nama;

        if (!acc[kelasId])
          acc[kelasId] = { nama: kelasNama, nilai: [], id: kelasId };
        acc[kelasId].nilai.push(item.nilai);

        return acc;
      }, {});

      const kelasAverages = [];
      for (const kelasId in groupedData) {
        const kelas = groupedData[kelasId];
        const nilaiKelas = kelas.nilai;
        const average = (
          nilaiKelas.reduce((sum, nilai) => sum + nilai, 0) / nilaiKelas.length
        ).toFixed(2);

        // Simpan rata-rata beserta nama dan id kelas
        kelasAverages.push({ nama: kelas.nama, average, id: kelas.id });
      }

      // Urutkan berdasarkan id kelas
      kelasAverages.sort((a, b) => a.id - b.id);

      const sortedKelasNames = kelasAverages.map((item) => item.nama);
      const averages = kelasAverages.map((item) => item.average);

      setKelasCategories(sortedKelasNames);
      return [{ name: "Rata-rata Nilai", data: averages }];
    }
  };

  const fetchNilaiUts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/nilai-uts",
        config
      );
      setNilaiUts(calculateAverage(response.data.data, selectedMatpelUts));
    } catch (error) {
      console.error("Error fetching nilai UTS:", error);
    }
  };

  const fetchNilaiUas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/nilai-uas",
        config
      );
      setNilaiUas(calculateAverage(response.data.data, selectedMatpelUas));
    } catch (error) {
      console.error("Error fetching nilai UAS:", error);
    }
  };

  const fetchMataPelajaran = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/matpel",
        config
      );
      setMataPelajaran(response.data.data);
      console.log("tes", response.data.data);
    } catch (error) {
      console.error("Error fetching mata pelajaran:", error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = today.toLocaleDateString("id-ID", options);
    setCurrentDate(formattedDate);

    fetchNilaiUts();
    fetchNilaiUas();
    fetchMataPelajaran();
  }, [selectedMatpelUts, selectedMatpelUas]); // Tambahkan dependency untuk kedua state
  console.log("Nilai UTSS:", nilaiUts);
  console.log("Nilai UAS:", nilaiUas);
  const chartOptions = {
    chart: {
      type: "bar",
      height: 240,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { columnWidth: "40%", borderRadius: 2 },
    },
    xaxis: {
      categories: kelasCategories,
      labels: { style: { colors: "#616161", fontSize: "12px" } },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: { style: { colors: "#616161", fontSize: "12px" } },
    },
    grid: {
      borderColor: "#dddddd",
      strokeDashArray: 5,
      padding: { top: 5, right: 20 },
    },
    fill: { opacity: 0.8 },
    tooltip: { theme: "dark" },
    colors: ["#020617"],
  };

  return (
    <div className="ml-96 grid grid-rows2 gap-8">
      <Card className="mt-8 w-96 h-36">
        <CardBody>
          <Typography
            color="blue-gray"
            className="font-normal mb-2 flex justify-end"
          >
            {currentDate}
          </Typography>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mt-3 flex items-center"
          >
            Selamat Datang Admin
          </Typography>
        </CardBody>
      </Card>
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex justify-between gap-4 rounded-none"
          >
            <Typography variant="h5" color="blue-gray">
              Nilai UTS
            </Typography>
            <select
              className="w-30 border-2 border-gray-900 p-1 rounded"
              onChange={(e) => setSelectedMatpelUts(Number(e.target.value))}
              value={selectedMatpelUts}
            >
              <option value="">Pilih Mata Pelajaran</option>
              {mataPelajaran.map((matpel) => (
                <option key={matpel.id} value={matpel.id}>
                  {matpel.nama}
                </option>
              ))}
            </select>
          </CardHeader>
          <CardBody className="p-0">
            <Chart
              options={chartOptions}
              series={nilaiUts}
              type="bar"
              height={240}
            />
          </CardBody>
        </Card>
        <Card className="mr-8">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex justify-between gap-4 rounded-none"
          >
            <Typography variant="h5" color="blue-gray">
              Nilai UAS
            </Typography>
            <select
              className="w-30 border-2 border-gray-900 p-1 rounded"
              onChange={(e) => setSelectedMatpelUas(Number(e.target.value))}
              value={selectedMatpelUas}
            >
              <option value="">Pilih Mata Pelajaran</option>
              {mataPelajaran.map((matpel) => (
                <option key={matpel.id} value={matpel.id}>
                  {matpel.nama}
                </option>
              ))}
            </select>
          </CardHeader>
          <CardBody className="p-0">
            <Chart
              options={chartOptions}
              series={nilaiUas}
              type="bar"
              height={240}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
