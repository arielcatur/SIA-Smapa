import { Link } from "react-router-dom";
import Select from "./Select";
import SelectDefault from "./Select";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export default function Login() {
  const { state, handleFunction } = useContext(GlobalContext);
  const { input } = state;
  const { handleChange, handleLogin } = handleFunction;
  const options = [
    {
      label: "Pilih Role",
      value: "",
    },
    {
      label: "Siswa",
      value: "siswa",
    },
    {
      label: "Wali Murid",
      value: "wali murid",
    },
    {
      label: "Guru",
      value: "guru",
    },
    {
      label: "Admin",
      value: "admin",
    },
  ];

  return (
    <div class="flex flex-col items-center w-full justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-xl shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="bg-white shadow-xl rounded-xl p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="flex justify-center">
            <h1 class="text-4xl font-bold text-black-900">Login</h1>
          </div>
          <form onSubmit={handleLogin} class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="flex mb-2 text-sm font-medium text-black-900"
              >
                Username
              </label>
              <input
                required
                onChange={handleChange}
                value={input.username}
                type="text"
                name="username"
                // id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                for="password"
                class="flex mb-2 text-sm font-medium text-black-900"
              >
                Password
              </label>
              <input
                required
                onChange={handleChange}
                value={input.password}
                type="password"
                name="password"
                placeholder="Enter your password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div>
              <label class="flex mb-2 text-sm font-medium text-black-900">
                Role
              </label>
              <select
                required
                className="border-2 border-gray-300 p-1 rounded"
                value={input.role}
                onChange={handleChange}
                name="role"
              >
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <button
              type={"submit"}
              class="w-full text-white bg-blue-400 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
