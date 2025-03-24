import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const defaultProfile = "http://localhost:3000/uploads/1729785245361.jpg";

export default function EditWali() {
  const { userId } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const [formData, setFormData] = useState({
    nama: "",
    noTelp: "",
    alamat: "",
    email: "",
    siswaId: "",
    ttl: "",
  });
  //   const [kelas, setKelas] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:3000/api/admin/kelas", config).then((res) => {
    //   setKelas(res.data.data);
    // });

    axios
      .get("http://localhost:3000/api/admin/wali-murid", config)
      .then((res) => {
        const waliData = res.data.data.find((wali) => {
          return wali.user && wali.user.id === parseInt(userId);
        });
        if (waliData) {
          setFormData({
            nama: waliData.nama,
            noTelp: waliData.noTelp,
            alamat: waliData.alamat,
            email: waliData.email,
            siswaId: waliData.siswa.id,
            ttl: waliData.ttl,
          });
        } else {
          alert("Data wali tidak ditemukan.");
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/admin/wali-murid/${userId}`,
        {
          ...formData,
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
        alert("Gagal menyimpan data wali.");
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

  return (
    <div className="ml-96 pl-32 my-2">
      <form onSubmit={handleSubmit}>
        <div className="block max-w-3xl px-6 pt-6 bg-white border border-gray-200 shadow">
          <p className="pb-2 font-bold text-xl">Profile Wali</p>
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
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  required
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="siswaId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Siswa
                </label>
                <input
                  required
                  type="number"
                  id="siswaId"
                  name="siswaId"
                  value={formData.siswaId}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="ttl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tahun Lahir
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
            </div>
            <div className="flex justify-end items-end pb-3">
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
      </form>
    </div>
  );
}
