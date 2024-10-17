import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const getTodayName = () => {
  const daysOfWeek = [
    "minggu",
    "senin",
    "selasa",
    "rabu",
    "kamis",
    "jumat",
    "sabtu",
  ];
  const today = new Date().getDay(); 
  return daysOfWeek[today];
};

export function HomeGuru() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [data, setData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [error, setError] = useState(null);
  // const [kelasData, setKelasData] = useState([]); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/guru/jadwal-mengajar", config)
      .then((res) => {
        const fetchedData = res.data.data;
        setData(fetchedData);

        const todayName = getTodayName();
        const filteredData = fetchedData.filter((item) => item.hari === todayName);
        setTodayData(filteredData);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error.response.data.message}`, error);
        setError("Gagal mengambil data jadwal.");
      });
  }, []);

  return (
    <Card className="ml-96 mt-8 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray">
          Jadwal Mengajar Hari Ini
        </Typography>
      </CardBody>

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}

      {!error && todayData.length > 0 ? (
        todayData.map((res) => (
          <CardFooter key={res.id} className="pt-0">
            <div className="flex justify-between p-2 border-black border-2">
              <div>{res.kelas.nama}</div>
              <div className="bg-cyan-400 px-2 rounded-full text-black">
                {res.jam}
              </div>
            </div>
          </CardFooter>
        ))
      ) : (
        <div className="text-center p-4">Tidak ada jadwal mengajar untuk hari ini.</div>
      )}
    </Card>
  );
}
