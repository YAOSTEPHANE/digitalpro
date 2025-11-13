"use client";

import Image3D from "@/components/ui/image-3d";

const stores = [
  {
    image: "/images/image2.png",
    quote: "Digitalpro Solutions nous a montré comment commencer, quoi faire et comment le faire.",
    name: "Jason Scer",
  },
  {
    image: "/images/shop-2.jpeg",
    quote:
      "Nous n'avions aucune idée de par où commencer, mais Digitalpro Solutions nous a montré le chemin. Et nous avons pu créer quelque chose d'incroyable.",
    name: "John Prency",
  },

  {
    image: "/images/s-2.webp",
    quote:
      "L'équipe de Digitalpro Solutions est incroyable. Ils nous ont aidés à créer une boutique magnifique dont nous sommes fiers.",
    name: "Miguel Martinez",
  },
];

const ShopifyStores = () => {
  return (
    <section
      className=" mt-10 md:py-10 bg-[#f6f5f4] w-full
    rounded-3xl
  
  "
    >
      <div className=" p-4   mx-auto relative z-10  w-full ">
        <div className="text-4xl py-10 md:pb-8 md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 bg-opacity-50">
          Shopify Boutique <br />
        </div>

        <p className="mt-4 text-lg font-normal  text-neutral-800 max-w-lg text-center mx-auto">
            Des boutiques Shopify conçues pour convertir les visiteurs en clients
        </p>
        <div className="md:flex items-center justify-center  px-10 ">
          {stores.map((store, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center mt-10 md:w-2/3 mx-auto"
            >
              <div className="flex flex-col items-center justify-center ">
                <Image3D
                  src={store.image}
                  alt="shopify store"
                  width={400}
                  height={400}
                  className="rounded-lg mx-auto"
                />
                <p className="text-neutral-800 font-bold text-lg mt-4 text-center ">
                  &quot;{store.quote}&quot;
                </p>
                <p className="text-neutral-800 font-bold text-lg mt-4">
                  {" "}
                  - {store.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopifyStores;