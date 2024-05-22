import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <section className="bg-secondary">
      <div className="container py-24 flex items-center justify-between ">
      <div>
        <h1 className="text-7xl font-black font-sans leading-2">When you learn, teach. <br/>
        <span className="text-primary">When you get, give.</span> </h1>
      </div>
      <div>
        <Image src={"/hero.png"} alt="Elib book" height={450} width={450} />
      </div>
      </div>
   </section>

    </>
   
  );
}