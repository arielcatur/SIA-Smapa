import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import defaultProfile from "../../assets/ariel.jpeg";
import Swal from "sweetalert2";

const defaultProfile = "http://localhost:3000/uploads/1730897735320.jpg";

export default function ProfileSiswa() {
  let config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };
  const [formData, setFormData] = useState({
    nis: "",
    kelasId: "",
    kelasNama: "",
    semester: "",
    nama: "",
    ttl: "",
    jk: "",
    agama: "",
    noTelp: "",
    alamat: "",
    foto: "",
  });
  const [file, setFile] = useState(null);
  const [foto, setFoto] = useState(defaultProfile);
  const [fetchStatus, setFetchStatus] = useState(true);

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:3000/api/siswa/profile", config)
        .then((res) => {
          // console.log(res.data.data);
          const data = res.data.data;
          setFormData({
            nis: data.nis || "",
            kelasId: data.kelas.id ? data.kelas.id.toString() : "",
            kelasNama: data.kelas.nama || "",
            semester: data.semester || "",
            nama: data.nama || "",
            ttl: data.ttl || "",
            jk: data.jk || "",
            agama: data.agama || "",
            noTelp: data.noTelp || "",
            alamat: data.alamat || "",
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
      nis: formData.nis || "",
      kelasId: formData.kelasId ? parseInt(formData.kelasId) : "",
      semester: formData.semester || "",
      nama: formData.nama || "",
      ttl: formData.ttl || "",
      jk: formData.jk || "",
      agama: formData.agama || "",
      noTelp: formData.noTelp || "",
      alamat: formData.alamat || "",
      foto: formData.foto || "",
    };

    console.log(updatedFormData);

    axios
      .post(
        "http://localhost:3000/api/siswa/profile/update",
        updatedFormData,
        config
      )
      .then((res) => {
        console.log(res);
        setFetchStatus(true);
        Swal.fire({
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
              {foto && (
                <img
                  src={foto}
                  alt="Uploaded"
                  className="max-h-[170px] max-w-32"
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
                    disabled
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
                  <input
                    disabled
                    type="text"
                    id="kelasId"
                    name="kelasId"
                    value={formData.kelasNama}
                    onChange={handleChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
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
    </>
  );
}
