"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface Image3DProps extends Omit<ImageProps, "className"> {
  className?: string;
  containerClassName?: string;
}

export default function Image3D({ className, containerClassName, ...imageProps }: Image3DProps) {
  return (
    <div className={cn("overflow-hidden", containerClassName)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl w-full h-full group/img",
          className
        )}
      >
        <Image
          {...imageProps}
          alt={imageProps.alt || ""}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] group-hover/img:scale-[1.045]"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover/img:opacity-100"
        />
      </div>
    </div>
  );
}

