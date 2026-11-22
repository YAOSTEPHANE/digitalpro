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
            src="/images/studio/web-architecture.webp"
            alt="Développement web - Sites web modernes et performants"
            width={500}
            height={500}
            className="rounded-2xl w-full h-[400px] object-cover"
          />
        </div>

        <div className="rounded-md px-2 md:p-10">
          <Image3D
            priority
            src="/images/studio/mobile-apps.webp"
            alt="Applications mobiles - iOS et Android"
            width={500}
            height={500}
            className="rounded-2xl w-full h-[400px] object-cover"
          />
        </div>

        <div className="rounded-md px-2 md:p-10">
          <Image3D
            priority
            src="/images/studio/analytics-growth.webp"
            alt="SEO et Marketing digital - Augmentez votre visibilité"
            width={500}
            height={500}
            className="rounded-2xl w-full h-[400px] object-cover"
          />
        </div>

        <div className="rounded-md px-2 md:p-10">
          <Image3D
            priority
            src="/images/studio/ui-ux-studio.webp"
            alt="Conception UI/UX - Design centré utilisateur"
            width={500}
            height={500}
            className="rounded-2xl w-full h-[400px] object-cover"
          />
        </div>

        <div className="rounded-md px-2 md:p-10">
          <Image3D
            priority
            src="/images/studio/ecommerce-commerce.webp"
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