import { Link } from "react-router-dom";
import Select from "./Select";

export default function Login() {
  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-xl shadow md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="bg-white shadow-xl rounded-xl p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="flex justify-center">
            <h1 class="text-4xl font-bold text-black-900">Login</h1>
          </div>
          <form class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="flex mb-2 text-sm font-medium text-black-900"
              >
                Username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
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
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
            <div>
              <label class="flex mb-2 text-sm font-medium text-black-900">
                Role
              </label>
              <Select />
            </div>
            <button
              type={"submit"}
              class="w-full text-white bg-blue-400 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to={"/homesiswa"}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
