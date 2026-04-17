import Link from "next/link";
import { BiSolidErrorAlt } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";


const Error404 = () => {
    return (
        <div className='flex flex-col space-y-4 min-h-screen justify-center items-center'>
            <BiSolidErrorAlt size={100} className="text-primary" />
            <h2 className="text-4xl font-bold">Page Not Found</h2>
            <Link href={"/"} className="btn flex items-center"><FaArrowLeft />Go to Home</Link>
        </div>
    );
};

export default Error404;