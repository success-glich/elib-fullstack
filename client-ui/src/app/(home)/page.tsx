import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/ProductCard";
import DataSetter from "./components/data-setter";


const products: Product[] = [
  { id: "1", name: "Margartia Pizza", description: "This is a very tasty pizza", image: '/file.png', price: 400 },
  { id: "2", name: "Margartia Pizza", description: "This is a very tasty pizza", image: '/file.png', price: 400 },
  { id: "3", name: "Margartia Pizza", description: "This is a very tasty pizza", image: '/file.png', price: 400 },
  { id: "4", name: "Margartia Pizza", description: "This is a very tasty pizza", image: '/file.png', price: 400 },
  { id: "5", name: "Margartia Pizza", description: "This is a very tasty pizza", image: '/file.png', price: 400 }
]


export default function Home() {

  // In real life it will come from external apis -> fetch.

  const data = {
    id: 1,
    name: '',
    description: 'lorem22jlkj sdlfjsdkf'
  }

  return (
    <>
      <DataSetter data={data} />
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

          <Tabs defaultValue="pizz" >
            <TabsList>
              <TabsTrigger value="pizz" className="text-md">Pizza</TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizz">
              <div className="grid grid-cols-4 gap-6 mt-6">
                {
                  products.map((product) => <ProductCard key={product.id} product={product} />)
                }
              </div>

            </TabsContent>
            <TabsContent value="beverages">

              <div className="grid grid-cols-4 gap-6 mt-6">
                {
                  products.map((product) => <ProductCard key={product.id} product={product} />)
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>


      </section>
    </>
  );
}
