import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import defaultProfile from "../../assets/ariel.jpeg";
import Swal from "sweetalert2";

export default function ProfileWali() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [formData, setFormData] = useState({
    nama: "",
    siswaId: "",
    noTelp: "",
    alamat: "",
    email: "",
    foto: "",
    namaSiswa: "",
  });
  const [file, setFile] = useState(null);
  const [foto, setFoto] = useState(defaultProfile);
  const [fetchStatus, setFetchStatus] = useState(true);

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:3000/api/wali-murid/profile", config)
        .then((res) => {
          console.log(res.data.data);
          // console.log(res.data.data);
          const data = res.data.data;
          setFormData({
            nama: data.nama || "",
            siswaId: data.siswa.id || "",
            noTelp: data.noTelp || "",
            alamat: data.alamat || "",
            email: data.email || "",
            namaSiswa: data.siswa.nama || "",
            foto: data.foto || "",
          });
          setFoto(data.foto);
        })
        .catch((error) => {});
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const uploadPhoto = async (selectedFile) => {
    const formDataPhoto = new FormData();
    formDataPhoto.append("foto", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/uploads",
        formDataPhoto,
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
          foto: response.data.data.foto,
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadPhoto(selectedFile);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedFormData = {
      nama: formData.nama || "",
      siswaId: formData.siswaId || "",
      noTelp: formData.noTelp || "",
      alamat: formData.alamat || "",
      email: formData.email || "",
      foto: formData.foto || "",
    };

    console.log(updatedFormData);

    axios
      .post(
        "http://localhost:3000/api/wali-murid/profile/update",
        updatedFormData,
        config
      )
      .then((res) => {
        console.log(res);
        setFetchStatus(true);
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Sukses Menyimpan Data",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error Response:", error.response.data);
          alert(`Error: ${error.response.data.message || "Terjadi kesalahan"}`);
        } else if (error.request) {
          console.error("Error Request:", error.request);
          alert("Tidak ada respon dari server.");
        } else {
          console.error("Error", error.message);
          alert("Error: " + error.message);
        }
      });
  };
  return (
    <>
      <div className="ml-96 pl-32 mt-2 lg:mt-20">
        <form onSubmit={handleSubmit}>
          <div className="block max-w-3xl px-6 pt-6 bg-white border border-gray-200 shadow">
            <p className="pb-2 font-bold text-xl">Profile</p>
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
                    ID Siswa
                  </label>
                  <input
                    disabled
                    type="text"
                    id="siswaId"
                    name="siswaId"
                    value={formData.siswaId}
                    onChange={handleChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="namaSiswa"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Siswa
                  </label>
                  <input
                    disabled
                    type="text"
                    id="namaSiswa"
                    name="namaSiswa"
                    value={formData.namaSiswa}
                    onChange={handleChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
