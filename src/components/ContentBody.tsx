
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";



export default function  ContentBody ({page}:{
    page: Content.BlogPostDocument | Content.ProjectDocument;
}) {


  function  formatDate(date: DateField){
    if (isFilled.date(date)){
      const dateOptions: Intl.DateTimeFormatOptions={
        weekday: "long",
        year: "numeric",
        month: "long",
        day:"numeric",
      };
      return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(date))
    }
  }
  const formattedDate=formatDate(page.data.date)
  return(
<Bounded as="article" >
  <div className="rounded-3xl backdrop-blur-xl bg-gray-900/40 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 px-6 py-12 md:px-10 md:py-24 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
    
    <div className="relative z-10">
      <Heading as="h1" className="text-white font-bold drop-shadow-lg">{page.data.title}</Heading>
      <div className="flex gap-3 mt-6 flex-wrap">
        {page.tags.map((tag)=>(
          <span key={tag} className="px-4 py-2 rounded-full bg-cyan-500/20 backdrop-blur-sm text-cyan-300 text-sm font-bold border border-cyan-400/50 glow-cyan shadow-lg shadow-cyan-500/30">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-8 pt-6 border-t border-cyan-400/40 text-lg font-medium text-gray-300">
        {formattedDate}
      </p>
      <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20 text-gray-200">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </div>
  </div>
</Bounded>);
}




