import Steps from "./Steps";

export default function Approach(){

    return(
        <section className="relative">
            
            <div className="min-h-screen flex flex-col items-center justify-center max-w-8xl gap-2">
            <span className="bg-zinc-900 border rounded-lg text-white text-4xl px-10 ">
            OUR APPROACH
          </span>
            <h2 className="text-[5vw] font-bold uppercase">
            From <span className="text-[6vw] font-black text-white bg-zinc-800 px-2 rounded-2xl">strategy</span> to execution,
            </h2>
            <h2 className="text-[5vw] font-bold uppercase">
            every <span className="text-[6vw] font-black bg-zinc-800 text-white px-2 rounded-2xl">decision</span> has purpose.
            </h2>

            <p className="max-w-3xl text-4xl pt-8 text-center">
            Every project is approached with clarity, intention, and attention to detail.
            Our process is designed to transform ideas into digital experiences that are
            thoughtful, memorable, and built to perform.
            </p>
            </div>
        
            <Steps />
        </section>

    )


}