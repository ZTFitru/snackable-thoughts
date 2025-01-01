import Sidebar from "@/components/AdminComponents/Sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children}) {
    return (
        <>
          <div className="flex">
            <ToastContainer theme="dark"/>
            <Sidebar />
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between w-full py-6 max-h-[63px] px-12 border-b border-black">
                <h1 className="font-semibold text-lg  text-gray-800">Admin Panel</h1>
              </div>
                {children}
            </div>
          </div>
        </>
      );
}
