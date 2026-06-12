"use client";

import Image3D from "@/components/ui/image-3d";
import LuxSectionHeader from "@/components/lux-section-header";
import LuxReveal from "@/components/lux-reveal";

const ModernWebsiteDesign = () => {
  const images = [
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
      alt: "Site web moderne",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
      alt: "Design responsive",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
      alt: "Interface utilisateur",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
      alt: "Expérience utilisateur",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
      alt: "Performance optimale",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
      alt: "Design moderne",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
      alt: "Solutions web",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
      alt: "Créativité digitale",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
      alt: "Innovation web",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
      alt: "Excellence digitale",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
      alt: "Transformation digitale",
    },
    {
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
      alt: "Solutions sur mesure",
    },
  ];

  return (
    <div className="relative w-full py-20 overflow-hidden px-2">
      <div className="lux-section-premium lux-section-spotlight relative">
        <LuxSectionHeader
          label="Sites web"
          title="Conception de sites web qui fonctionnent"
          description="Créer, concevoir et développer des sites web qui fonctionnent pour votre entreprise."
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <LuxReveal
              key={img.src}
              delay={index * 0.05}
              className={index === 0 || index === 3 || index === 6 || index === 9 ? "row-span-2" : ""}
            >
              <div className="lux-card-interactive overflow-hidden p-1 h-full transition-transform duration-300 hover:scale-[1.02]">
                <Image3D
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={300}
                  className="h-auto max-w-full rounded-lg w-full"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </LuxReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernWebsiteDesign;
