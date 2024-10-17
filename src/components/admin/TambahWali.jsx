import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import defaultProfile from "../../assets/ariel.jpeg";

export default function TambahWali() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama: "",
    noTelp: "",
    alamat: "",
    email: "",
    siswaId: "",
  });
//   const [file, setFile] = useState(null);
//   const [foto, setFoto] = useState(defaultProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       uploadPhoto(selectedFile);
//     }
//   };

//   const uploadPhoto = async (selectedFile) => {
//     const formData = new FormData();
//     formData.append("foto", selectedFile);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/uploads",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${Cookies.get("token")}`,
//           },
//         }
//       );

//       if (response.data.status) {
//         setFoto(response.data.data.foto);
//         setFormData({ ...formData, foto: response.data.data.foto });
//         alert(response.data.message);
//       } else {
//         alert("Upload foto gagal.");
//       }
//     } catch (error) {
//       console.error(
//         "Error uploading photo:",
//         error.response ? error.response.data : error.message
//       );
//       alert("Terjadi kesalahan saat mengupload foto.");
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/wali-murid",
        {
          ...formData,
          siswaId: parseInt(formData.siswaId),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.data.status) {
        alert("Data siswa berhasil disimpan");
      } else {
        alert("Gagal menyimpan data siswa.");
      }
    } catch (error) {
      console.error("Error saving student data:", error);
      alert(`Error: ${error.response.data.message || "Terjadi kesalahan"}`);
    }
    setFormData({
      username: "",
      password: "",
      nama: "",
      noTelp: "",
      alamat: "",
      email: "",
      siswaId: "",
    });
  };

  return (
    <div className="lg:ml-96 lg:pl-32 lg:mt-20 my-2">
      <form onSubmit={handleSubmit}>
        <div className="block max-w-3xl px-6 py-6 bg-white border border-gray-200 shadow">
          <p className="pb-2 font-bold text-xl">Profile Wali</p>
          {/* <div className="flex justify-start">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "block", margin: "10px 0" }}
            />
            {foto && (
              <img
                src={foto}
                alt="Uploaded"
                className="max-h-[150px] max-w-32"
              />
            )}
          </div> */}
          <div>
            <div className="grid grid-cols-2 gap-2 mx-auto my-3">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  required
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
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
                  htmlFor="siswaId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Id Siswa
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
              <div className="flex justify-end items-end">
                <button
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
