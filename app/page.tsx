import Navbar from "@/components/navbar";
import SliderOne from "../components/ui/slider";
import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import Link from "next/link";
import GraphicDesign from "./graphic-design";
import WebsiteDesign from "./siteweb";
import ShopifyStores from "./shopify-stores";
import Brands from "./brands";

export default function Home() {
  return (
    <div className="w-full md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Navbar />
      <Spotlight className="hidden md:flex md:-top-80 left-80  " fill="white" />
      <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
        <div
          className="text-4xl pb-5 md:text-7xl px-6 text-center  
        bg-clip-text text-transparent bg-gradient-to-b 
        from-neutral-50 to bg-neutral-400 
        bg-opacity-50"
        >
          Créez, développez et <br /> faites évoluer votre entreprise
        </div>
        <p className="mt-4 text-lg font-normal  text-neutral-300 max-w-lg text-center mx-auto px-4">
          Des solutions sur mesure pour votre entreprise. Nous sommes une équipe
          de créatifs qui sont ravis de vous aider à développer votre
          entreprise.
        </p>
        <Link
          href={"/appel"}
          className="cursor-pointer flex items-center justify-center border 
          rounded-full w-48 p-2  mx-auto my-6 text-white "
        >
          Réserver un appel
        </Link>
        <div className="w-full pt-20 ">
          <SliderOne />
          <GraphicDesign />
          <WebsiteDesign />
          <ShopifyStores />
          <Brands />
        </div>
      </div>
    </div>
  );
}
