import { Badge } from "@/components/ui/badge";
import React from "react";

const Hero: React.FC = () => {
  const clients = [
    { name: "StartUp Inc.", highlight: false },
    { name: "Award Winner", highlight: true },
    { name: "Enterprise Co", highlight: false },
    { name: "Tech Giant", highlight: false },
    { name: "Global Brand", highlight: false },
    { name: "Creative Studio", highlight: false },
  ];

  return (
    <section className="w-full flex flex-col items-center h-screen justify-center">
      {/* Hero Content */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-8 pb-16 relative z-10">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-75 md:w-150 h-75 md:h-100 bg-primary/20 blur-[80px] md:blur-[100px] rounded-full -z-10 pointer-events-none"></div>

        <div className="mb-8">
          <Badge>About Me</Badge>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#0a0c10] dark:text-white leading-[1.1] tracking-tighter mb-8">
          I've been{" "}
          <span className="relative inline-block mx-1 md:mx-2">
            <span className="bg-[#0a0c10] text-white px-3 md:px-6 py-1 md:py-2 rounded-xl md:rounded-2xl inline-block transform -rotate-2 shadow-xl z-10 relative">
              Developing
            </span>
          </span>
          <br className="hidden md:block" />
          Websites since{" "}
          <span className="relative inline-block mx-1 md:mx-2">
            <span className="bg-[#0a0c10] text-white px-3 md:px-6 py-1 md:py-2 rounded-xl md:rounded-2xl inline-block transform rotate-2 shadow-xl z-10 relative">
              2019
            </span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed font-medium">
          We start every new client interaction with an in-depth discovery call
          where we get to know each other and recommend the best course of
          action.
        </p>
      </div>

      {/* Clients Section */}
      {/* <div className="w-full max-w-6xl mx-auto px-2 mt-8 md:mt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <h3 className="text-xl font-black uppercase text-gray-400 w-full md:w-32 leading-tight">
            Previously Worked On
          </h3>
          <div className="flex flex-wrap gap-3 md:gap-4 flex-1">
            {clients.map((client, index) => (
              <div
                key={index}
                className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold transition-all cursor-default
                  ${
                    client.highlight
                      ? "bg-[#111] text-white border border-black transform -rotate-1 shadow-lg"
                      : "border border-gray-300 bg-white text-gray-800 hover:bg-black hover:text-white hover:border-black"
                  }`}
              >
                {client.name}
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
