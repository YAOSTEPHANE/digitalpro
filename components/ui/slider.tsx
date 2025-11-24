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
              src="/images/business.jpeg"
              alt="Solutions digitales pour entreprises - digitalpro solutions"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="/images/coffe.jpeg"
              alt="Agence digitale spécialisée en marketing et développement web"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="/images/small-business-3.webp"
              alt="Accompagnement des petites entreprises dans leur transformation digitale"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="/images/man.jpeg"
              alt="Expertise en SEO et référencement naturel - digitalpro solutions"
              width={500}
              height={500}
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>

        <div className="rounded-md px-2 md:p-10">
            <Image3D
              priority
              src="/images/image-business.jpeg"
              alt="Services de développement web et création de sites internet professionnels"
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