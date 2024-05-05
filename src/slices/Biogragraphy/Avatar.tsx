"use client"
import { ImageField } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import {useEffect, useRef } from "react";
import gsap from "gsap";

type AvatarProps ={
    image: ImageField;
    className?: string;

}

export  default function  Avatar({image, className}:AvatarProps){
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.inOut",
        },
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);
    return(
        <div ref={component} className={clsx("relative h-full w-full",className)}>
            <div className="avatar overflow-hidden opacity-0">
                <PrismicNextImage
                field={image}
                className="avatar-image h-full w-full object-full"
                imgixParams={{q:100}}/>
                <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
            </div>
        </div>

    )
}