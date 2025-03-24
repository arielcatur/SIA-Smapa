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
const TABLE_HEAD = [
  "Hari",
  "Jam",
  "Nama Guru",
  "Nama Kelas",
  "Nama Matpel",
  "Action",
];
export function TambahJadwal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [data, setData] = useState([]);
  const [mataPelajaran, setMataPelajaran] = useState([]);
  const [kelas, setKelas] = useState([]);
  const [input, setInput] = useState({
    hari: "",
    jam: "",
    guruId: "",
    kelasId: "",
    matpelId: "",
  });
  const [fetchStatus, setFetchStatus] = useState(true);
  const [currentId, setCurrentId] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/kelas", config).then((res) => {
      setKelas(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/matpel", config).then((res) => {
      setMataPelajaran(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:3000/api/admin/jadwal-pelajaran", config)
        .then((res) => {
          setData([...res.data.data]);
        })
        .catch((error) => {});
      setFetchStatus(false);
      console.log(currentData);
    }
  }, [fetchStatus, setFetchStatus]);

  const handleInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleMatpelChange = (event) => {
    const selectedMatpelId = event.target.value;
    setInput({ ...input, matpelId: selectedMatpelId });
  };

  const handleKelasChange = (event) => {
    const selectedKelasId = event.target.value;
    setInput({ ...input, kelasId: selectedKelasId });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let { hari, jam, guruId, kelasId, matpelId } = input;
    if (currentId === -1) {
      axios
        .post(
          "http://localhost:3000/api/admin/jadwal-pelajaran",
          { hari, jam, guruId, kelasId, matpelId },
          config
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
        })
        .catch((error) => {
          console.error("Error saat menambah jadwal pelajaran:", error);
          alert(`Gagal menambah jadwal`);
        });
    } else {
      axios
        .post(
          `http://localhost:3000/api/admin/jadwal-pelajaran/${currentId}`,
          { hari, jam, guruId, kelasId, matpelId },
          config
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
        })
        .catch((error) => {
          console.error("Error saat memperbarui jadwal pelajaran:", error);
          alert(`Gagal memperbarui jadwal`);
        });
    }
    setCurrentId(-1);
    setInput({
      hari: "",
      jam: "",
      guruId: "",
      kelasId: "",
      matpelId: "",
    });
  };

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);

    axios
      .delete(
        `http://localhost:3000/api/admin/jadwal-pelajaran/${idData}`,
        config
      )
      .then((res) => {
        setFetchStatus(true);
      });
  };

  const handleAdd = () => {
    setCurrentId(-1);
    setInput({
      hari: "",
      jam: "",
      guruId: "",
      kelasId: "",
      matpelId: "",
    });
    handleOpen();
  };

  const handleEdit = (event) => {
    let idData = parseInt(event.target.value);
    let jadwalToEdit = data.find((jadwal) => jadwal.id === idData);

    if (jadwalToEdit) {
      setInput({
        hari: jadwalToEdit.hari,
        jam: jadwalToEdit.jam,
        guruId: jadwalToEdit.guru.id,
        kelasId: jadwalToEdit.kelas.id,
        matpelId: jadwalToEdit.mataPelajaran.id,
      });

      setCurrentId(idData);
      handleOpen();
    }
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / dataPerPage)) {
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
        <p className="flex justify-center font-bold text-xl">
          Data Jadwal Pelajaran
        </p>
      </div>
      <div className="grid grid-rows-[auto_auto] justify-center ml-80">
        <div className="my-2 justify-self-end">
          <button
            onClick={handleAdd}
            className="border border-blue-gray-300 py-1 px-2 bg-blue-gray-300 text-white hover:bg-white hover:text-blue-gray-300"
          >
            Tambah jadwal pelajaran
          </button>
        </div>
        <Card className="h-full w-[850px] rounded-none">
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
                          {res.hari}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {res.jam}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {res.guru.nama}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {res.kelas.nama}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {res.mataPelajaran.nama}
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
            <button
              onClick={handlePreviousPage}
              className="w-20 h-10 border-4 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white"
            >
              Previous
            </button>
            <div className="border w-8 bg-blue-gray-200 border-blue-gray-200 text-white text-center pt-2">
              {currentPage}
            </div>
            <button
              onClick={handleNextPage}
              className="border-4 w-20 h-10 border-blue-gray-200 hover:bg-blue-gray-200 hover:text-white"
            >
              Next
            </button>
          </div>
        </Card>
      </div>
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
                Tambah/Edit Jadwal Pelajaran
              </Typography>
              <select
                onChange={handleInput}
                value={input.hari}
                name="hari"
                className="border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="">Pilih Hari</option>
                <option value="senin">Senin</option>
                <option value="selasa">Selasa</option>
                <option value="rabu">Rabu</option>
                <option value="kamis">Kamis</option>
                <option value="jumat">Jumat</option>
              </select>

              <Input
                onChange={handleInput}
                value={input.jam}
                name="jam"
                label="Jam"
                size="lg"
                required
              />

              <Input
                onChange={handleInput}
                value={input.guruId}
                name="guruId"
                label="Id Guru"
                size="lg"
                type="number"
                required
              />

              <select
                onChange={handleKelasChange}
                value={input.kelasId}
                name="kelasId"
                className="border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="">Pilih Kelas</option>
                {kelas.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res.nama}
                  </option>
                ))}
              </select>
              <select
                onChange={handleMatpelChange}
                value={input.matpelId}
                name="matpelId"
                className="border border-gray-300 rounded-lg p-2"
                required
              >
                <option value="">Pilih Mata Pelajaran</option>
                {mataPelajaran.map((matpel) => (
                  <option key={matpel.id} value={matpel.id}>
                    {matpel.nama}
                  </option>
                ))}
              </select>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                onClick={handleOpen}
                type="submit"
                variant="gradient"
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
