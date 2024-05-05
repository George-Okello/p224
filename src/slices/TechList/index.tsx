"use client"

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useRef ,useEffect} from "react"
import { TbCircleTriangle } from "react-icons/tb";
import {gsap} from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger)
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null)

  useEffect(()=>{
    let ctx = gsap.context(()=>{
      const t1=gsap.timeline({
        scrollTrigger:{
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 5

        }
      })
      t1.fromTo(
        ".tech-row",
        {
          x:(index)=>{
            return index %2 ==0 ? gsap.utils.random(500,200): gsap.utils.random(-500,-200);
          },
        },
        {
          x:(index)=>{
            return index %2 ==0 ? gsap.utils.random(-500,-200): gsap.utils.random(500,200);
          },
          ease: "power1.inOut"
        }
      )
    }, component)
    return () => ctx.revert()
  })
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <Bounded as="div" >
        <Heading size="xl" className="mb-7" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      {slice.items.map(({tech_color,tech_name},index)=>(
        <div key={index} className="tech-row mb-8 flex items-center  justify-center gap-6 text-cyan-900"
          aria-label={tech_name || undefined}
        >
          {Array.from({length: 15},(_,index)=>(
            <React.Fragment key={index}>
               <span className="tech-item text-8xl font-semibold tracking-tighter"
               style={{
                color: index==7 && tech_color ? tech_color: "inherit"
               }}>
                {tech_name}
               </span>
               <span className="text-3xl">
                  <TbCircleTriangle />
               </span> 
            </React.Fragment> 
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
