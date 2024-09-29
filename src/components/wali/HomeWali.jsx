import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function HomeWali() {
    return (
      <Card className="ml-96 mt-8 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Absen Anak Hari ini
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="py-2 text-center font-bold w-[100px] rounded-lg bg-gray-900 text-white">Tidak Hadir</div>
        </CardFooter>
      </Card>
    );
  }