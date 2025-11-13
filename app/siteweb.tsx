"use client";

import Image3D from "@/components/ui/image-3d";

const WebsiteDesign = () => {
  return (
    <div className="text-white">
      <div className="p-4 mx-auto relative z-10 w-full pt-10 md:pt-20 px-2">
        <div className="text-4xl  md:text-7xl text-center bg-clip-text text-transparent bg-gradient-to-b from-purple-500 to-sky-200 bg-opacity-50">
          Conception de sites web <br /> qui fonctionne
        </div>
        <p className="mt-4 text-lg font-normal  text-neutral-300 max-w-lg text-center mx-auto px-4">
          Créer, concevoir et développer des sites web qui fonctionnent pour
          votre entreprise.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
              alt="Gallery image"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
              alt="Gallery image 1"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />

          </div>
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
              alt="Gallery image 2"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
              alt="Gallery image 3"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
              alt="Gallery image 4"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
              alt="Gallery image 5"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
              alt="Gallery image 6"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
              alt="Gallery image 7"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
              alt="Gallery image 8"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
              alt="Gallery image 9"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
              alt="Gallery image 10"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div>
            <Image3D
              className="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
              alt="Gallery image 11"
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WebsiteDesign;
