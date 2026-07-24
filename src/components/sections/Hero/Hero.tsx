export default function HeroBanner() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0 w-full h-full pointer-events-auto ">
        <iframe
          src="https://my.spline.design/untitled-qLFBL7CC6qHsK8C4FhFOd8rx/"
          width="100%"
          height="100%"
          title="Spline 3D Scene"
          className="w-full h-full border-0 pointer-events-auto bg-transparent"
          // allowTransparency={true}
          loading="lazy"
        />

        <div className="absolute bottom-0 -right-2 w-50 h-15 bg-[#fcf7f1] z-20 pointer-events-none" />
      </div>
      <div className=" w-full flex flex-col justify-center items-center z-5">
        <div className="flex flex-col w-6xl justify-center items-center">
          <span className="bg-zinc-900 border rounded-lg text-white px-10 ">
            PREMIUM DIGITAL STUDIO
          </span>

          <h1 className="text-zinc-800 text-8xl font-bold text-center">
            WE DESIGN
            <span className="text-zinc-600 italic">WEBSITES</span> THAT PEOPLE
            REMEMBER.
          </h1>
        </div>

        <div className="flex w-6xl justify-center items-center gap-10 mt-8">
          <button className="text-base border-2 rounded-lg border-zinc-800 px-7 py-3 cursor-pointer hover:bg-zinc-800 hover:text-white shadow-xl/30 shadow-zinc-800">
            Start a Project
          </button>

          <button className="text-base  px-7 py-3  cursor-pointer hover:bg-zinc-600 bg-zinc-800 text-white hover:text-white shadow  rounded-lg">
            <span className="">View Our Work</span>
          </button>
          {/* <p className="w-120 text-center text-lg">We craft modern websites and digital experiences that help ambitious brands stand out, build trust, and grow online. </p> */}
        </div>
      </div>
    </section>
  );
}
