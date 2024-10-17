import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ARROWRIGHT } from "../Icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export function InputNilaiUTS() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [data, setData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:3000/api/guru/kelas", config)
        .then((res) => {
          // console.log(res.data.data);
          setData([...res.data.data]);
        })
        .catch((error) => {});
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Nilai UTS</p>
      </div>
      <Card className="ml-96 mt-2 w-96">
        <CardBody className="py-2">
          <Typography variant="h5" color="blue-gray">
            Daftar Kelas
          </Typography>
        </CardBody>
        {data !== null &&
          data.map((res) => {
            return (
              <CardFooter className="mt-0 pt-0">
                <div className="flex justify-between p-2 border-black border-2">
                  <div>{res.nama}</div>
                  <Link to={"/nilaiutsguru"}>
                    <button className="bg-black w-8 h-8 border-4 border-black ">
                      <ARROWRIGHT />
                    </button>
                  </Link>
                </div>
              </CardFooter>
            );
          })}
      </Card>
    </>
  );
}

