import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function HomeAdmin() {
    return (
      <Card className="ml-96 mt-8 w-96 h-36">
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2 flex justify-end">
            01-01-2024
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mt-3 flex items-center">
            Selamat Datang Admin
          </Typography>
        </CardBody>
      </Card>
    );
  }