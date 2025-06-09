import Link from "next/link";
import banner from "@/app/assets/imgs/banner.png";
import Image from "next/image";

const Banner = () => {
  return (
    <div
      className="w-full bg-cover bg-center h-screen overflow-y-hidden text-white flex flex-col items-center justify-center "
      style={{ backgroundImage: `url(${banner.src})` }}
    >
      <div className=" md:w-[60%] p-5  ">
        <h3 className=" uppercase text-4xl font-bold mb-2">CGPA Calculator</h3>
        <p className="md:text-2xl text-xl leading-[40px] mb-8">
          Track your academic journey, calculate your GPA, and visualize your
          progress with our intuitive CGPA calculator.
        </p>
        <Link
          href={"/record"}
          className="bg-[#0193DC] text-white font-semibold px-8 py-4 rounded mt-7"
        >
          Add Results
        </Link>
        {/* < Image src={banner} alt=""/> */}
      </div>
    </div>
  );
};

export default Banner;
