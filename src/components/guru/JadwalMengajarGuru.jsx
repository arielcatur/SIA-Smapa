import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
  export function JadwalMengajarGuru() {
    return (
      <>
        <div className="ml-80 py-4">
          <p className="flex justify-center font-bold text-xl">Jadwal Pelajaran</p>
        </div>
        <Card className="ml-96 mt-8 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray">
              Senin
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex justify-between p-2 border-black border-2">
              <div>Fisika</div>
              <div className="bg-cyan-400 px-2 rounded-full text-black">
                07:30-09:00
              </div>
            </div>
            <div className="flex justify-between p-2 border-black border-2">
              <div>Fisika</div>
              <div className="bg-cyan-400 px-2 rounded-full text-black">
                07:30-09:00
              </div>
            </div>
            <div className="flex justify-between p-2 border-black border-2">
              <div>Fisika</div>
              <div className="bg-cyan-400 px-2 rounded-full text-black">
                07:30-09:00
              </div>
            </div>
            <div className="flex justify-between p-2 border-black border-2">
              <div>Fisika</div>
              <div className="bg-cyan-400 px-2 rounded-full text-black">
                07:30-09:00
              </div>
            </div>
          </CardFooter>
        </Card>
      </>
    );
  }
  