import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="p-4 0 mt-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-evenly items-center bg-[#1f3056] rounded-xl">
        <div className="flex flex-col max-w-lg">
          <h1 className="text-center text-4xl mt-4  text-white font-bold  sm:text-5xl md:text-4xl lg:text-5xl md:mt-4 sm:mt-4 md:text-left md:pl-4 ">
            Investing in Your Education
          </h1>
          <p className="px-2 text-center md:text-left mt-2 text-sm font-light text-white max-w-sm">
            Investing in your education is one of the most important decisions
            you can make for your future. We believe that education is not just
            an expense, but a valuable investment that yields lifelong returns.
          </p>
          <div className="sm:mx-auto ml-2 lg:mx-0">
            <Link href="/menu">
              <Button className="mt-4 ">Get Started</Button>
            </Link>
          </div>
        </div>
        {/* Image */}
        <div className="max-w-xl">
          <Image src="/study.svg" alt="Hero Image" width={384}  height={90}/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
