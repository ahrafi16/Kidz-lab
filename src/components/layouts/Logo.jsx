import Image from "next/image";
import Link from "next/link";


const Logo = () => {
    return (
        <Link href={"/"} className="flex items-center gap-1">
            <Image alt="logo-hero-kidz" src={"/assets/logo.png"}
                width={50}
                height={40}>

            </Image>
            <h2 className="text-xl font-bold"><span className="text-primary">Kidz</span> Lab</h2>
        </Link>
    );
};

export default Logo;