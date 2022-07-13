import { SearchIcon } from '@heroicons/react/outline'

const Search = () => {
  return (
    <div className="grid grid-cols-[auto,1fr] items-center gap-3 px-3 py-1 border-[1px] border-gray-200 rounded-md">
      <SearchIcon className="w-5 h-5" />
      <input
        type="text"
        placeholder="Search Here"
        className="py-2 pl-3 outline-none bg-transparent"
      />
    </div>
  )
}

export default Search
