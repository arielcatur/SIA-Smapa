import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function AbsenSiswa() {
    return (
      <Card className="ml-96 mt-8 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Absen Untuk Hari ini
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button className="mx-1 w-[82px] bg-transparent text-blue-300 border-2 border-blue-300 hover:bg-blue-400 hover:text-white">Hadir</Button>
          <Button className="mx-1 w-[82px] bg-transparent text-yellow-300 border-2 border-yellow-300 hover:bg-yellow-400 hover:text-white">Izin</Button>
          <Button className="mx-1 w-[82px] bg-transparent text-red-300 border-2 border-red-300 hover:bg-red-400 hover:text-white">Sakit</Button>
        </CardFooter>
      </Card>
    );
  }