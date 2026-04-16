import { fontBangla } from "@/app/layout";
import Image from "next/image";


const Banner = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex-1 space-y-5">
                <h2 className={`${fontBangla.className} text-6xl font-bold leading-20`}>আপনার শিশুকে দিন ভালোবাসার একটি <span class="text-primary">মিষ্টি চমক</span> ✨</h2>
                <p>Buy every toy with up to 15% Discount</p>
                <button className="btn btn-primary btn-outline">Explore Products</button>
            </div>
            <div className="flex-1">
                <Image alt="Buy every toy with up to 15% Discount" src={"/assets/hero.png"} width={500} height={400}></Image>
            </div>
        </div>
    );
};

export default Banner;