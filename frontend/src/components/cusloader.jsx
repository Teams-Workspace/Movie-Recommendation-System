import { BarLoader } from 'react-spinners';

function CustomLoader() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <BarLoader color="var(--red-main)" width={200} height={6} />
        <p className="text-gray-500 text-center">Loading movies...</p>
      </div>
    </div>
  );
}

export default CustomLoader;