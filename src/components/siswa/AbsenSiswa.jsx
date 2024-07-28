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
          <Button className="mx-1">Hadir</Button>
          <Button className="mx-1">Sakit</Button>
        </CardFooter>
      </Card>
    );
  }