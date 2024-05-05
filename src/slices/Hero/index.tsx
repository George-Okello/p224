"use client";
import { useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useScramble } from "use-scramble";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes"

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin:"left top",
          delay:0.5,
          stagger:{
            each: 0.2,
            from: "random"
          }
        }
      );
       t1.fromTo(".banner", {
        y:20,
        opacity: 0,
        scale: 1.2
       }, {
        opacity: 1,
        y:0,
        duration: 1,
        scale: 1,
        ease: "elastic.out(1,0.3)",
       })
    }, component);

    return () => ctx.revert();
  }, []);

  const renderLetters = (name: string | null | undefined, key: string) => {
    if (!name) return null;
    return name.split("").map((letter, index) => (
      <span key={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ));
  };

  const { ref, replay } = useScramble({
    text: slice.primary.tag_line || "", // Using slice.primary.tag_line for scrambling
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes/>
        <div className="col-start-1 md:row-span-1">
          <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter">
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-zinc-400">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="banner black bg-gradient-to-tr from-orange-500 via-green-200 to-orange-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            <a
              ref={ref}
              onMouseOver={replay}
              onFocus={replay}
            >
              {slice.primary.tag_line}
            </a>
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;

