import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <section className="bg-white">
        <div className="container py-24">
          <div className="flex items-center justify-between">
            <div >
              <h1 className="text-7xl font-black font-sans leading-2">Super Delicious  Pizza in <br />

                <span className="text-primary">Only 45 Minutes!</span>
              </h1>
              <p className="text-xl mt-8 max-w-lg">
                Enjoy a Free Meal if Your Order  Takes More Than 45 Minutes!
              </p>
              <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
                Get Your Pizza now
              </Button>
            </div>

            <div className="mb-7">
              <Image alt="pizza-main" src={"/file.png"} width={500} height={500} />
            </div>
          </div>
        </div>
      </section>

      <section>

        <div className="container py-12" >

          <Tabs defaultValue="pizz" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="pizz" className="text-md">Pizza</TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizz"> Pizza list

            </TabsContent>
            <TabsContent value="beverages">beverages Lists</TabsContent>
          </Tabs>
        </div>


      </section>
    </>
  );
}
