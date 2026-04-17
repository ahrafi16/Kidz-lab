import Logo from "@/components/layouts/Logo";

const loading = () => {
    return (
        <div className='flex flex-col space-y-4 min-h-screen justify-center items-center'>
            <h2 className="text-5xl font-bold animate-pulse">Loading</h2>
            <div className="animate-ping">
                <Logo></Logo>
            </div>
        </div>
    );
};

export default loading;