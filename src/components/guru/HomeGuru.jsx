import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function HomeGuru() {
  return (
    <Card className="ml-96 mt-8 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray">
          Jadwal Mengajar Hari Ini
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex justify-between p-2 border-black border-2">
          <div>XI 1</div>
          <div className="bg-cyan-400 px-2 rounded-full text-black">
            07:30-09:00
          </div>
        </div>
        <div className="flex justify-between p-2 border-black border-2">
          <div>XI 1</div>
          <div className="bg-cyan-400 px-2 rounded-full text-black">
            07:30-09:00
          </div>
        </div>
        <div className="flex justify-between p-2 border-black border-2">
          <div>XI 1</div>
          <div className="bg-cyan-400 px-2 rounded-full text-black">
            07:30-09:00
          </div>
        </div>
        <div className="flex justify-between p-2 border-black border-2">
          <div>XI 1</div>
          <div className="bg-cyan-400 px-2 rounded-full text-black">
            07:30-09:00
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
