import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import axios from "axios";
const TABLE_HEAD = ["Id Matpel", "Mata Pelajaran", "Action"];

export function DataMataPelajaran() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [dataMatpel, setDataMatpel] = useState(null);
  const [input, setInput] = useState({
    nama: "",
  });
  //indikator
  const [fetchStatus, setFetchStatus] = useState(true);
  const [currentId, setCurrentId] = useState(-1);

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:3000/api/admin/matpel", config)
        .then((res) => {
          // console.log(res.data.data);
          setDataMatpel([...res.data.data]);
        })
        .catch((error) => {});
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const handleInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let { nama } = input;
    if (currentId === -1) {
      axios
        .post("http://localhost:3000/api/admin/matpel", { nama }, config)
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
        });
    } else {
      axios
        .post(
          `http://localhost:3000/api/admin/matpel/${currentId}`,
          { nama },
          config
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
        });
    }
    setCurrentId(-1);
    // clear input setelah create data
    setInput({
      nama: "",
    });
  };

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);

    axios
      .delete(`http://localhost:3000/api/admin/matpel/${idData}`, config)
      .then((res) => {
        setFetchStatus(true);
      });
  };

  const handleEdit = (event) => {
    handleOpen();
    let idData = parseInt(event.target.value);
    setCurrentId(idData);
  };

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">
          Data Mata Pelajaran
        </p>
      </div>
      <div className="grid grid-rows-[auto_auto] justify-center ml-80">
        <div className="my-2 justify-self-end">
          <button
            onClick={handleOpen}
            className="border border-blue-gray-300 py-1 px-2 bg-blue-gray-300 text-white hover:bg-white hover:text-blue-gray-300"
          >
            Tambah mata pelajaran
          </button>
        </div>
        <Card className="h-full w-[550px] rounded-none">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataMatpel !== null &&
                dataMatpel.map((res, index) => {
                  const isLast = index === res.id.length - 1;
                  const classes = isLast
                    ? "p-4 border-b border-blue-gray-50"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={res.id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {res.id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {res.nama}
                        </Typography>
                      </td>
                      <td className="grid grid-cols-2 text-white  p-4 border-b border-blue-gray-50">
                        <button
                          onClick={handleEdit}
                          value={res.id}
                          className=" bg-blue-300 border border-white h-8 hover:bg-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          value={res.id}
                          className=" bg-red-300 border border-white h-8 hover:bg-red-400"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="flex justify-end p-4 ">
            <button className="w-20 h-10 border-4 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white">
              Previous
            </button>
            <div className="border w-8 bg-blue-gray-200 border-blue-gray-200 text-white text-center pt-2">
              1
            </div>
            <button className="border-4 w-20 h-10 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white">
              Next
            </button>
          </div>
        </Card>
      </div>
      {/* <Button onClick={handleOpen} className=" ml-80">Sign In</Button> */}
      {/* modal */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Tambah Mata Pelajaran
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Nama Mata Pelajaran
              </Typography>
              <Input
                onChange={handleInput}
                value={input.nama}
                // type={"submit"}
                name="nama"
                label="Nama Mata Pelajaran"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type={"submit"} variant="gradient" onClick={handleOpen} fullWidth>
                Simpan
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
