import { Card, Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Link } from "react-router-dom";
const TABLE_HEAD = ["No", "Nama Kelas", "Absen", "Action"];

export function TambahDataKelas() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [dataKelas, setDataKelas] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = useState({
    nama: "",
  });
  const [fetchStatus, setFetchStatus] = useState(true);
  const [currentId, setCurrentId] = useState(-1);
  const handleOpen = () => setOpen((cur) => !cur);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:3000/api/admin/kelas", config)
        .then((res) => {
          setDataKelas([...res.data.data]);
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
        .post("http://localhost:3000/api/admin/kelas", { nama }, config)
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
        });
    } else {
      axios
        .post(
          `http://localhost:3000/api/admin/kelas/${currentId}`,
          { nama },
          config
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
        });
    }
    setCurrentId(-1);
    setInput({
      nama: "",
    });
  };

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);

    axios
      .delete(`http://localhost:3000/api/admin/kelas/${idData}`, config)
      .then((res) => {
        setFetchStatus(true);
      });
  };

  const handleEdit = (event) => {
    let idData = parseInt(event.target.value);
    let kelasToEdit = dataKelas.find((kelas) => kelas.id === idData);

    if (kelasToEdit) {
      setInput({
        nama: kelasToEdit.nama,
      });

      setCurrentId(idData);
      handleOpen();
    }
  };

  const handleAdd = () => {
    setCurrentId(-1);
    setInput({
      nama: "",
    });
    handleOpen();
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataKelas.slice(indexOfFirstData, indexOfLastData);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(dataKelas.length / dataPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">Data Kelas</p>
      </div>
      <div className="grid grid-rows-[auto_auto] justify-center ml-80">
        <div className="my-2 justify-self-end">
          <button
            onClick={handleAdd}
            className="border border-blue-gray-300 py-1 px-2 bg-blue-gray-300 text-white hover:bg-white hover:text-blue-gray-300"
          >
            Tambah Kelas
          </button>
        </div>
        <Card className="h-full w-[650px] rounded-none">
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
              {currentData !== null &&
                currentData.map((res, index) => {
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
                          {index + 1}
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
                      <td className=" text-white  p-4 border-b border-blue-gray-50">
                        <Link to={`/absenbyadmin/${res.id}`}>
                          <button className="bg-blue-300 px-2 border border-white h-8 hover:bg-blue-400">
                            Absen
                          </button>
                        </Link>
                      </td>
                      <td className="grid grid-cols-2 text-white  p-4 border-b border-blue-gray-50">
                        <button
                          onClick={handleEdit}
                          value={res.id}
                          className="bg-blue-300 border border-white h-8 hover:bg-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          value={res.id}
                          className="bg-red-300 border border-white h-8 hover:bg-red-400"
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
            <button onClick={handlePreviousPage} className="w-20 h-10 border-4 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white">
              Previous
            </button>
            <div className="border w-8 bg-blue-gray-200 border-blue-gray-200 text-white text-center pt-2">
            {currentPage}
            </div>
            <button onClick={handleNextPage} className="border-4 w-20 h-10 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white">
              Next
            </button>
          </div>
        </Card>
      </div>
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
                Tambah Kelas
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Nama Kelas
              </Typography>
              <Input
                onChange={handleInput}
                value={input.nama}
                name="nama"
                label="Nama Kelas"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type={"submit"}
                variant="gradient"
                onClick={handleOpen}
                fullWidth
              >
                Simpan
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}
