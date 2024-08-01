import Link from "next/link";

export function Finalfooter() {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="text-center mb-8">
        <h1 className="text-red-500 font-bold text-3xl"> - - - The Roadmap - - - </h1>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Link href="#" className="flex flex-col items-center gap-2 group" prefetch={false}>
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-red-500 group-hover:bg-red-500 group-hover:text-white cursor-pointer">
            1
          </div>
          <h3 className="text-sm font-medium text-gray-500">Choose Topic</h3>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-2 group" prefetch={false}>
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-red-500 group-hover:bg-red-500 group-hover:text-white cursor-pointer">
            2
          </div>
          <h3 className="text-sm font-medium text-gray-500">Any Questions?</h3>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-2 group" prefetch={false}>
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-red-500 group-hover:bg-red-500 group-hover:text-white cursor-pointer">
            3
          </div>
          <h3 className="text-sm font-medium text-gray-500">Make a Plan</h3>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-2 group" prefetch={false}>
          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold text-red-500 group-hover:bg-red-500 group-hover:text-white cursor-pointer">
            4
          </div>
          <h3 className="text-sm font-medium text-gray-500">Search Files</h3>
        </Link>
      </div>
    </footer>
  );
}
