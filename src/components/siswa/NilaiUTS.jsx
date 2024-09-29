import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ARROWRIGHT } from "../Icons";

export function NilaiUTS() {
  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Nilai UTS</p>
      </div>
      <Card className="ml-96 mt-8 w-96">
        {/* <CardBody>
            <Typography variant="h5" color="blue-gray">
              Senin
            </Typography>
          </CardBody> */}
        <CardFooter>
          <div className="flex justify-between p-2 border-black border-2">
            <div>Fisika</div>
            <div className="bg-cyan-400 px-2 rounded-full text-white">80</div>
          </div>
          <div className="flex justify-between p-2 border-black border-2">
            <div>Fisika</div>
            <div className="bg-cyan-400 px-2 rounded-full text-white">80</div>
          </div>
          <div className="flex justify-between p-2 border-black border-2">
            <div>Fisika</div>
            <div className="bg-cyan-400 px-2 rounded-full text-white">80</div>
          </div>
          <div className="flex justify-between p-2 border-black border-2">
            <div className="mt-1">Fisika</div>
            <button className="bg-black w-8 h-8 border-4 border-black ">
              <ARROWRIGHT/>
            </button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
