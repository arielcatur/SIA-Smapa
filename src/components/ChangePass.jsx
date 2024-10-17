// import { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Swal from 'sweetalert2';

// export default function ChangePassSiswa() {
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const token = Cookies.get("token");

//     axios
//       .post("http://localhost:3000/api/auth/change-password", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Password berhasil diubah!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//         setFormData({
//           oldPassword: "",
//           password: "",
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Gagal mengubah password!',
//           text: error.response?.data?.message || 'Terjadi kesalahan',
//         });
//       });
//   };

//   return (
//     <>
//       {/* <div className="ml-80 flex flex-col items-center justify-center mt-24"> */}
//       <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//         <div className="w-full p-6 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
//           <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//             Change Password
//           </h2>
//           <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
//             <div>
//               <label
//                 htmlFor="oldPassword"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Password Lama
//               </label>
//               <input
//                 type="password"
//                 name="oldPassword"
//                 id="oldPassword"
//                 placeholder="••••••••"
//                 value={formData.oldPassword}
//                 onChange={handleChange}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Password Baru
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full text-white bg-blue-400 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//             >
//               Reset Password
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Swal from 'sweetalert2';

export default function ChangePassSiswa() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    password: "",
  });
  const [role, setRole] = useState(""); // State untuk role pengguna
  const navigate = useNavigate();  // Gunakan useNavigate untuk redirect

  useEffect(() => {
    const role = Cookies.get("role");
    setRole(role)
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    axios
      .post("http://localhost:3000/api/auth/change-password", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Password berhasil diubah!',
          showConfirmButton: false,
          timer: 1500
        });

        // Redirect berdasarkan role pengguna
        switch (role) {
          case "siswa":
            navigate("/homesiswa");
            break;
          case "guru":
            navigate("/homeguru");
            break;
          case "wali":
            navigate("/homewali");
            break;
          case "admin":
            navigate("/homeadmin");
            break;
          default:
            navigate("/");  // Jika role tidak dikenal, kembalikan ke login
            break;
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal mengubah password!',
          text: error.response?.data?.message || 'Terjadi kesalahan',
        });
      });
  };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password Lama
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="••••••••"
                value={formData.oldPassword}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password Baru
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-400 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
