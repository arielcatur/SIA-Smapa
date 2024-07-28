import { SEARCH } from "./Icons";

export default function Search() {
  return (
    <form className="max-w-64 w-60">
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-2  text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required=""
        />
        <button
          type="submit"
          className="text-white absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium h-full px-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <SEARCH/>
        </button>
      </div>
    </form>
  );
}
