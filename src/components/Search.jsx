import { SEARCH } from "./Icons";

export default function Search() {
  return (
    <form className="max-w-64 w-60">
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-2  text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          required=""
        />
        <button
          type="submit"
          className="text-white absolute end-0 bottom-0 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium h-full px-3"
        >
          <SEARCH/>
        </button>
      </div>
    </form>
  );
}
