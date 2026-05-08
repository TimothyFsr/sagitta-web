import Image from "next/image";

interface iPhoneMockupProps {
  screenshot: string;
  alt: string;
}

export default function iPhoneMockup({ screenshot, alt }: iPhoneMockupProps) {
  return (
    <div className="relative mx-auto" style={{ width: "280px" }}>
      {/* iPhone Frame */}
      <div className="relative bg-[#1c1c1e] rounded-[3rem] p-3 shadow-2xl border-8 border-[#1c1c1e]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#1c1c1e] rounded-b-3xl z-10"></div>
        
        {/* Screen */}
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          <Image
            src={screenshot}
            alt={alt}
            width={375}
            height={812}
            quality={90}
            className="w-full h-full object-cover object-top"
          />
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
      </div>
      
      {/* Side Buttons */}
      <div className="absolute right-0 top-24 w-1 h-16 bg-[#1c1c1e] rounded-l-sm"></div>
      <div className="absolute left-0 top-20 w-1 h-8 bg-[#1c1c1e] rounded-r-sm"></div>
      <div className="absolute left-0 top-32 w-1 h-12 bg-[#1c1c1e] rounded-r-sm"></div>
      <div className="absolute left-0 top-48 w-1 h-12 bg-[#1c1c1e] rounded-r-sm"></div>
    </div>
  );
}
