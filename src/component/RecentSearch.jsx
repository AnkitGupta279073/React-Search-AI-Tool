const RecentSearch = ({ recentHistroy, showSidebar, onSelectHistory, onClearHistory }) => {
  return (
    <div className={`${
      showSidebar ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 fixed md:relative md:col-span-1 bg-zinc-800 pt-3 h-screen w-64 md:w-auto transition-transform duration-300 ease-in-out z-40 left-0 top-0`}>
      <h1 className='text-white text-2xl flex text-center justify-center border-b border-zinc-700 px-2'>
        <span className='text-lg'>Recent Search</span>
        <button onClick={onClearHistory} className='cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
        </button>
      </h1>
      <ul className='text-left overflow-auto mt-2 h-[calc(100vh-80px)]'>
        {
          recentHistroy && recentHistroy.map((item, index) => (
            <li 
              onClick={() => onSelectHistory(item)} 
              key={index} 
              className='px-5 py-2 mx-2 mb-2 truncate hover:bg-zinc-700 cursor-pointer text-zinc-400 hover:text-zinc-50 rounded-xl'
            >
              {item}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default RecentSearch;
