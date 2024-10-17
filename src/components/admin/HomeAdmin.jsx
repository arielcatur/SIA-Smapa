import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

export function HomeAdmin() {
  const { state } = useContext(GlobalContext);
  const { token } = state;
  
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    console.log(token);
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('id-ID', options); // Format Indonesia
    setCurrentDate(formattedDate);
  }, []);

  return (
    <Card className="ml-96 mt-8 w-96 h-36">
      <CardBody>
        <Typography  color="blue-gray" className="font-normal mb-2 flex justify-end">
          {currentDate}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mt-3 flex items-center">
          Selamat Datang Admin
        </Typography>
      </CardBody>
    </Card>
  );
}
