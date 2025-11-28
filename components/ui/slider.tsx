"use client";

import Slider from "react-slick";
import Image3D from "@/components/ui/image-3d";
import { useMediaQuery } from "react-responsive";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderOne = () => {
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 1000,
    className: "w-full mx-auto cursor-pointer center-mode",
  };

  if (isMediumScreen) {
    settings.slidesToShow = 1.67;
  } else if (isSmallScreen) {
    settings.slidesToShow = 1;
  }

  return (
    <div>
      <Slider {...settings}>
        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
              alt="Développement web - Sites web modernes et performants"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop"
              alt="Applications mobiles - iOS et Android"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
              alt="SEO et Marketing digital - Augmentez votre visibilité"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
              alt="Conception UI/UX - Design centré utilisateur"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
              alt="E-commerce - Solutions de vente en ligne"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>
      </Slider>
    </div>
  );
};

export default SliderOne;