import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ARROWRIGHT } from "../Icons";

export function InputNilaiUTS() {
  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Nilai UTS</p>
      </div>
      <Card className="ml-96 mt-2 w-96">
        <CardBody className="py-2">
          <Typography variant="h5" color="blue-gray">
            Matematika
          </Typography>
        </CardBody>
        <CardFooter className="mt-0 pt-0">
          <div className="flex justify-between p-2 border-black border-2">
            <div>XI 1</div>
            <button className="bg-black w-8 h-8 border-4 border-black ">
              <ARROWRIGHT />
            </button>
          </div>
          <div className="flex justify-between p-2 border-black border-2">
            <div>XI 1</div>
            <button className="bg-black w-8 h-8 border-4 border-black ">
              <ARROWRIGHT />
            </button>
          </div>
          <div className="flex justify-between p-2 border-black border-2">
            <div>XI 1</div>
            <button className="bg-black w-8 h-8 border-4 border-black ">
              <ARROWRIGHT />
            </button>
          </div>
          <div className="flex justify-between p-2 border-black border-2">
            <div>XI 1</div>
            <button className="bg-black w-8 h-8 border-4 border-black ">
              <ARROWRIGHT />
            </button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
