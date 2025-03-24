import {
  Card,
  CardBody,
  Typography,
  CardHeader,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
// import { GlobalContext } from "../../context/GlobalContext";
import Chart from "react-apexcharts";
import axios from "axios";
import Cookies from "js-cookie";

const chartConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export function HomeAdmin2() {
  // const { state } = useContext(GlobalContext);
  // const { token } = state;
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [currentDate, setCurrentDate] = useState("");
  const [nilaiUts, setNilaiUts] = useState([]);
  const [nilaiUas, setNilaiUas] = useState([]);
  const [mataPelajaran, setMataPelajaran] = useState([]);
  const [selectedMatpelUts, setSelectedMatpelUts] = useState("");
  const [selectedMatpelUas, setSelectedMatpelUas] = useState("");

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
  }, []);

  const fetchNilaiUas = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/nilai-uas",
        config
      );
      setNilaiUas(response.data.data);
      console.log("uas", response.data.data);
    } catch (error) {
        console.error("Error fetching nilai UAS:", error);
    }
  };
  
  const fetchNilaiUts = async () => {
      try {
          const response = await axios.get(
              "http://localhost:3000/api/admin/nilai-uts",
              config
            );
            setNilaiUts(response.data.data);
            console.log("uts", response.data.data);
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
      console.log("matpel", response.data.data);
    } catch (error) {
      console.error("Error fetching mata pelajaran:", error);
    }
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
        <Card className="">
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
              label="Pilih Mata Pelajaran"
              className="w-30 border-2 border-gray-900 p-1 rounded flex justify-end"
            >
              <option value="">Pilih Mata Pelajaran</option>
            </select>
          </CardHeader>
          <CardBody className="p-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
        <Card className="mr-14">
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
              label="Pilih Mata Pelajaran"
              className="w-30 border-2 border-gray-900 p-1 rounded flex justify-end"
            >
              <option value="">Pilih Mata Pelajaran</option>
            </select>
          </CardHeader>
          <CardBody className="p-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
