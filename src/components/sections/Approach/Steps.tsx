
import { approachData } from "@/data/approachData";

export default function Steps() {
  return (
    <>
      {approachData.map((approach, index) => (
        <div
          key={index}
          className="min-h-screen grid grid-cols-12  relative px-6 py-4"
        >
          <div className="col-span-4 flex flex-col items-start justify-start gap-3 py-8">
            <div className="">
              <span className="text-4xl">
                {approach.number}
              </span>
            </div>

            <div className="pt-12">
              <h2 className="text-7xl font-black text-zinc-800">
                {approach.title}
              </h2>
            </div>

          </div>

          <div className=" col-span-4 flex flex-col items-start justify-center">

          <h2
          className="text-[30rem] relative -left-43 font-black text-transparent bg-cover bg-center bg-clip-text"
          style={{
            backgroundImage: `url(${approach.image.src})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "2px #d6d6d6",
          }}
        >
          {approach.number}
        </h2>   

          </div>

          <div className=" col-span-4 flex flex-col items-start justify-end">
            <div className="flex flex-col gap-6">
              <p className="max-w-3xl text-2xl pt-8">{approach.description}</p>

            <div className="flex flex-col gap-2">
                {approach.Deliverables.map((deliver, index)=>(
                <h3 key={index} className="text-2xl font-bold">
                {deliver} /
                </h3>
                ))}
             
            </div>
            </div>

          </div>
        </div>
      ))}
    </>
  );
}
