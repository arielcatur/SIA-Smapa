import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const defaultProfile = "http://localhost:3000/uploads/1730897735320.jpg";

export default function EditSiswa() {
  const { userId } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [formData, setFormData] = useState({
    nis: "",
    kelasId: "",
    semester: "",
    nama: "",
    ttl: "",
    jk: "",
    agama: "",
    noTelp: "",
    alamat: "",
    foto: "", // Mulai dengan foto kosong
  });
  const [file, setFile] = useState(null);
  const [foto, setFoto] = useState(defaultProfile);
  const [kelas, setKelas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/kelas", config).then((res) => {
      setKelas(res.data.data);
    });

    axios
      .get("http://localhost:3000/api/admin/siswa", config)
      .then((res) => {
        const siswaData = res.data.data.find((siswa) => {
          return siswa.user && siswa.user.id === parseInt(userId);
        });
        if (siswaData) {
          setFormData({
            nis: siswaData.nis,
            kelasId: siswaData.kelas.id,
            semester: siswaData.semester,
            nama: siswaData.nama,
            ttl: siswaData.ttl,
            jk: siswaData.jk,
            agama: siswaData.agama,
            noTelp: siswaData.noTelp,
            alamat: siswaData.alamat,
            foto: siswaData.foto || defaultProfile, // Gunakan foto yang ada atau default
          });
          setFoto(siswaData.foto || defaultProfile);
        } else {
          alert("Data siswa tidak ditemukan.");
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [userId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadPhoto(selectedFile);
    }
  };

  const uploadPhoto = async (selectedFile) => {
    const formData = new FormData();
    formData.append("foto", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.data.status) {
        setFoto(response.data.data.foto);
        setFormData((prevData) => ({
          ...prevData,
          foto: response.data.data.foto, // Update foto jika diupload
        }));
        alert(response.data.message);
      } else {
        alert("Upload foto gagal.");
      }
    } catch (error) {
      console.error(
        "Error uploading photo:",
        error.response ? error.response.data : error.message
      );
      alert("Terjadi kesalahan saat mengupload foto.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/admin/siswa/${userId}`,
        {
          ...formData,
          kelasId: parseInt(formData.kelasId),
          foto: file ? formData.foto : formData.foto || defaultProfile, // Gunakan foto baru jika diupload, jika tidak gunakan foto yang ada atau default
        },
        config
      );

      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: "Sukses Menyimpan Data",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        alert("Gagal menyimpan data siswa.");
      }
    } catch (error) {
      console.error("Error saving student data:", error);
      alert(`Error: ${error.response?.data?.message || "Terjadi kesalahan"}`);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKelasChange = (event) => {
    const selectedKelasId = event.target.value;
    setFormData({ ...formData, kelasId: selectedKelasId });
  };

  return (
    <div className="ml-96 pl-32 my-2">
      <form onSubmit={handleSubmit}>
        <div className="block max-w-3xl px-6 pt-6 bg-white border border-gray-200 shadow">
          <p className="pb-2 font-bold text-xl">Profile</p>
          <div className="flex justify-start">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "block", margin: "10px 0" }}
            />
            {foto ? (
              <img
                src={foto}
                alt="Foto Profile"
                className="max-h-[150px] max-w-32"
              />
            ) : (
              <img
                src={defaultProfile}
                alt="Foto Profile"
                className="max-h-[150px] max-w-32"
              />
            )}
          </div>

          <div>
            <div className="grid grid-cols-2 gap-2 mx-auto my-3">
              <div>
                <label
                  htmlFor="nama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama
                </label>
                <input
                  required
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="nis"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  NIS
                </label>
                <input
                  required
                  type="number"
                  id="nis"
                  name="nis"
                  value={formData.nis}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="kelasId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kelas
                </label>
                <select
                  onChange={handleKelasChange}
                  value={formData.kelasId}
                  name="kelasId"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">Pilih Kelas</option>
                  {kelas.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="semester"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Semester
                </label>
                <select
                  required
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Pilih Semester</option>
                  <option value="Satu / 1">Satu / 1</option>
                  <option value="Dua / 2">Dua / 2</option>
                  <option value="Tiga / 3">Tiga / 3</option>
                  <option value="Empat / 4">Empat / 4</option>
                  <option value="Lima / 5">Lima / 5</option>
                  <option value="Enam / 6">Enam / 6</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="ttl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tempat Tanggal Lahir
                </label>
                <input
                  required
                  type="text"
                  id="ttl"
                  name="ttl"
                  value={formData.ttl}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="jk"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Jenis Kelamin
                </label>
                <select
                  required
                  id="jk"
                  name="jk"
                  value={formData.jk}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="agama"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Agama
                </label>
                <input
                  required
                  type="text"
                  id="agama"
                  name="agama"
                  value={formData.agama}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="noTelp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  No Telepon
                </label>
                <input
                  required
                  type="text"
                  id="noTelp"
                  name="noTelp"
                  value={formData.noTelp}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="alamat"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Alamat
                </label>
                <input
                  required
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end items-end">
                <button
                  onClick={() => window.location.reload()}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
