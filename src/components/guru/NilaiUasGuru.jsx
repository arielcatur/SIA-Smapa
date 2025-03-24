import { Card, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Button,
  Dialog,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";

const TABLE_HEAD = ["No", "Nama", "NIS", "Nilai", "Action"];

export function NilaiUasGuru() {
  const [mataPelajaran, setMataPelajaran] = useState([]);
  const [selectedMatpelId, setSelectedMatpelId] = useState("");
  const handleOpen = () => setOpen((cur) => !cur);
  const [open, setOpen] = React.useState(false);
  const { kelasId } = useParams();
  const [siswaData, setSiswaData] = useState([]);
  const [nilaiData, setNilaiData] = useState([]);
  const [kelas, setKelas] = useState({});
  const [input, setInput] = useState({
    nilai: "",
    siswaId: "",
    matpelId: "",
  });

  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  useEffect(() => {
    const fetchSiswaData = async () => {
      try {
        const resKelas = await axios.get(
          `http://localhost:3000/api/guru/kelas/${kelasId}`,
          config
        );
        setSiswaData(resKelas.data.data.siswa);
        setKelas(resKelas.data.data); // Nama kelas, dll.
      } catch (error) {
        console.error("Error fetching siswa data", error);
      }
    };

    const fetchNilaiData = async () => {
      // Hanya melakukan fetch jika mata pelajaran dipilih
      if (!selectedMatpelId) {
        setNilaiData([]); // Kosongkan data nilai jika belum memilih mata pelajaran
        return;
      }

      try {
        const resNilai = await axios.get(
          `http://localhost:3000/api/guru/nilai-uas`,
          config
        );
        console.log(resNilai);
        const nilaiFiltered = resNilai.data.data.filter(
          (item) =>
            item.kelas.id == kelasId &&
            item.mataPelajaran.id == selectedMatpelId
        );
        setNilaiData(nilaiFiltered);
      } catch (error) {
        console.error("Error fetching nilai data", error);
      }
    };

    const fetchMataPelajaran = async () => {
      try {
        const resMatpel = await axios.get(
          `http://localhost:3000/api/guru/jadwal-mengajar`,
          config
        );
        const matpelFiltered = resMatpel.data.data.filter(
          (item) => item.kelas.id == kelasId
        );
        setMataPelajaran(matpelFiltered);
        console.log(mataPelajaran);
      } catch (error) {
        console.error("Error fetching mata pelajaran", error);
      }
    };

    fetchSiswaData();
    fetchNilaiData();
    fetchMataPelajaran();
  }, [kelasId, selectedMatpelId]);

  const mergedData = siswaData.map((siswa) => {
    const nilaiObj = nilaiData.find((nilai) => nilai.siswa.id === siswa.id);
    return {
      ...siswa,
      nilai: nilaiObj ? nilaiObj.nilai : 0, // Nilai default menjadi 0 jika tidak ada nilai
      matpelId:
        nilaiObj && nilaiObj.mataPelajaran
          ? nilaiObj.mataPelajaran.id
          : selectedMatpelId || "",
      nilaiId: nilaiObj ? nilaiObj.id : null,
    };
  });

  const handleMatpelChange = (event) => {
    const matpelId = event.target.value; // Pastikan event ada dan memiliki target
    setSelectedMatpelId(matpelId);
    // console.log("Mata Pelajaran yang Dipilih:", matpelId);
  };

  // const mergedData = siswaData.map((siswa) => {
  //   const nilaiObj = nilaiData.find((nilai) => nilai.siswa.id === siswa.id);
  //   return {
  //     ...siswa,
  //     nilai: nilaiObj ? nilaiObj.nilai : 0, // Jika tidak ada nilai, default 0
  //     matpelId: nilaiObj && nilaiObj.mataPelajaran ? nilaiObj.mataPelajaran.id : selectedMatpelId || "", // Menggunakan matpelId dari nilaiObj atau selectedMatpelId
  //     nilaiId: nilaiObj ? nilaiObj.id : null, // Menyimpan ID nilai
  //   };
  // });

  const handleEdit = (event) => {
    const idData = parseInt(event.target.value);
    const nilaiToEdit = mergedData.find((siswa) => siswa.id === idData);

    if (nilaiToEdit) {
      setInput({
        nilai: nilaiToEdit.nilai,
        siswaId: nilaiToEdit.id, // Menggunakan id siswa
        matpelId: nilaiToEdit.matpelId,
        nilaiId: nilaiToEdit.nilaiId, // Menggunakan nilaiId yang benar
      });
      handleOpen(); // Membuka modal untuk edit
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validasi nilai harus antara 0 dan 100
    if (input.nilai < 0 || input.nilai > 100) {
      alert("Nilai harus antara 0 dan 100");
      return;
    }

    try {
      if (!input.nilaiId) {
        // Jika nilaiId tidak ada, lakukan POST untuk insert data baru
        await axios.post(
          `http://localhost:3000/api/guru/nilai-uas`,
          {
            nilai: input.nilai,
            siswaId: input.siswaId,
            matpelId: input.matpelId,
          },
          config
        );

        setNilaiData((prevData) => [
          ...prevData,
          {
            nilai: input.nilai,
            siswa: { id: input.siswaId },
            matpelId: input.matpelId,
          },
        ]);

        console.log("Nilai berhasil ditambahkan.");
      } else {
        // Jika nilaiId ada, lakukan PUT untuk update data yang sudah ada
        await axios.post(
          `http://localhost:3000/api/guru/nilai-uas/${input.nilaiId}`,
          {
            nilai: input.nilai,
            siswaId: input.siswaId,
            matpelId: input.matpelId,
          },
          config
        );

        setNilaiData((prevData) =>
          prevData.map((item) =>
            item.id === input.nilaiId ? { ...item, nilai: input.nilai } : item
          )
        );

        console.log("Nilai berhasil diupdate.");
      }

      handleOpen();
    } catch (error) {
      console.error("Error updating or inserting nilai", error);
      alert(`Error: ${error.response?.data?.message || "Terjadi kesalahan"}`);
    }
  };

  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <div className="ml-80 py-4">
        <p className="flex justify-center font-bold text-xl">
          Daftar Siswa Kelas {kelas.nama}
        </p>
        <div className="flex justify-end p-2">
          <select
            label="Pilih Mata Pelajaran"
            // value={selectedMatpelId}
            onChange={handleMatpelChange}
            className="w-60 border-2 border-gray-900 p-1 rounded"
          >
            <option value="">Pilih Mata Pelajaran</option>
            {mataPelajaran.map((matpel) => (
              <option
                key={matpel.mataPelajaran.id}
                value={matpel.mataPelajaran.id}
              >
                {matpel.mataPelajaran.nama}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Card className="h-full ml-80">
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
            {mergedData.length > 0 ? (
              mergedData.map((res, index) => (
                <tr key={res.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {res.nama}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {res.nis}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <div>{res.nilai}</div>
                    </Typography>
                  </td>
                  <td className="grid grid-cols-1 text-white p-4 border-b border-blue-gray-50">
                    <button
                      className={`bg-blue-300 border border-white h-8 hover:bg-blue-400 ${!selectedMatpelId ? 'cursor-not-allowed opacity-50' : ''}`}
                      value={res.id}
                      onClick={handleEdit}
                      disabled={!selectedMatpelId}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Tidak ada data yang ditemukan.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
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
                Input Nilai UAS
              </Typography>
              <Input
                type="number" // Batasi input hanya angka
                min="0" // Nilai minimum
                max="100" // Nilai maksimum
                onChange={handleInput}
                value={input.nilai}
                name="nilai"
                label="Nilai"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Simpan
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Dialog>
    </>
  );
}