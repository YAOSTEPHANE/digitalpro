import Image from "next/image";
import React from "react";

import { Lora } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Lora({
  subsets: ["latin"],
  weight: ["400"],
});

const technologies = [
  {
    name: "React",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "JavaScript",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Vite",
    image: "https://vitejs.dev/logo.svg",
  },
  {
    name: "Tailwind CSS",
    image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
  },
  {
    name: "React Native",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Flutter",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "Cursor",
    image: "https://cursor.sh/favicon.svg",
  },
  {
    name: "Lovable",
    image: "https://www.lovable.dev/favicon.svg",
  },
  {
    name: "Gemini",
    image: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
  },
  {
    name: "n8n",
    image: "https://avatars.githubusercontent.com/u/42425935?s=200&v=4",
  },
  {
    name: "Suno",
    image: "https://www.suno.ai/favicon.ico",
  },
];

const Brands = () => {
  return (
    <div>
      <div className=" p-4   mx-auto relative z-10  w-full pt-20 md:pt-32">
        <div className="text-4xl md:pb-8 md:text-7xl text-center 
        bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
          Technologies <br /> Utilisées
        </div>

        <p className="mt-4 text-lg font-normal  text-neutral-300 max-w-lg text-center mx-auto">
          Nous utilisons les technologies les plus modernes et performantes pour créer 
          des solutions digitales innovantes et efficaces.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-center mx-auto md:w-4/5 mt-8">
          {technologies.map((tech, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center p-4 md:p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3">
                <Image
                  priority
                  src={tech.image}
                  width={80}
                  height={80}
                  alt={tech.name}
                  className="w-full h-full object-contain filter group-hover:brightness-110 transition-all"
                />
              </div>
              <span className="text-xs md:text-sm text-neutral-400 group-hover:text-purple-400 transition-colors text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "flex items-center justify-center text-xl xl:text-2xl pt-10 md:pt-0 pb-4  px-8  text-center text-white  ",
            font.className
          )}
        >
          &quot;Nous avons éliminé près d&apos;une douzaine d&apos;outils différents grâce à ce que Digitalpro Solutions fait pour nous.&quot;
        </div>

        <div className="items-center flex justify-center flex-col text-white">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={1000}
            height={1000}
            className="pt-2 xl:pt-0  w-10 xl:w-14 "
          />

          <div className=" text-center">
            <div className="text-sm  font-medium pt-4">VANIE LOU RUTH VICTOIRE</div>
            <div className="text-sm">Directrice Marketing</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;