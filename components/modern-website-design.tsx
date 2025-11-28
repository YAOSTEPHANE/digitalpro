"use client";

import { motion } from "framer-motion";
import Image3D from "@/components/ui/image-3d";

const ModernWebsiteDesign = () => {
  const images = [
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      alt: "Site web moderne"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      alt: "Design responsive"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      alt: "Interface utilisateur"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      alt: "Expérience utilisateur"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      alt: "Performance optimale"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
      alt: "Design moderne"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      alt: "Solutions web"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      alt: "Créativité digitale"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      alt: "Innovation web"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      alt: "Excellence digitale"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      alt: "Transformation digitale"
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
      alt: "Solutions sur mesure"
    },
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-500 to-blue-300">
              Conception de sites web
            </span>
            <br />
            <span className="text-white">qui fonctionnent</span>
          </h2>
          <p className="mt-4 text-lg font-normal text-neutral-300 max-w-lg text-center mx-auto">
            Créer, concevoir et développer des sites web qui fonctionnent pour votre entreprise.
          </p>
        </motion.div>

        {/* Grille d'images 3D */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`
                ${index === 0 || index === 3 || index === 6 || index === 9 ? 'row-span-2' : ''}
              `}
            >
              <Image3D
                src={img.src}
                alt={img.alt}
                width={500}
                height={300}
                className="h-auto max-w-full rounded-lg w-full"
                style={{ width: "100%", height: "auto" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernWebsiteDesign;


