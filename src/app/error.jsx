"use client";
import Link from "next/link";
import { BiSolidErrorAlt } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";


const error = () => {
    return (
        <div className='flex flex-col space-y-4 min-h-screen justify-center items-center'>
            <BiSolidErrorAlt size={100} className="text-primary" />
            <h2 className="text-4xl font-bold">Something Went Wrong</h2>
            <Link href={"/"} className="btn flex items-center"><FaArrowLeft />Go to Home</Link>
        </div>
    );
};

export default error;