import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getGallery } from "@/lib/getGallery";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import icon from "../../public/divider.svg";

async function GalleryList({ query }: { query: string }) {
  unstable_noStore();
  const data = await getGallery(query);
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2">
      {data?.slice(0, 8).map((item, index) => (
        <Dialog key={index}>
          <DialogTrigger className="">
            <div className="flex justify-center md:w-[280px] md:h-[200px] w-[100px] h-[80px] p-1 ">
              {item.category === "video" ? (
                <div className="md:flex hidden">
                  <iframe
                    width="308"
                    height="200"
                    className="object-fill px-2 rounded"
                    src={`${item.content}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={item.content}
                  className=" rounded-md hover:opacity-90"
                  width={308}
                  height={208}
                  alt={item.category}
                />
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="w-full flex justify-center items-center ">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={item.content}
              className=" rounded-md hover:opacity-90"
              width={500}
              height={500}
              alt={item.category}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

async function HomeGallery({ query }: { query: string }) {
  return (
    <section id="gallery" className="bg-[#FCFCFD]">
      <div className="p-2 md:mx-20">
        <h1 className="py-2 text-4xl font-semibold text-center text-color-main">
          গ্যালারী
        </h1>
        <div className="flex flex-col items-center justify-center gap-2 py-3 ">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={icon}
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-md md:p-1">
            <Suspense fallback={<h2>Loading...</h2>}>
              <GalleryList query={query} />
            </Suspense>
            <div className="flex justify-center py-4">
              <Button
                size={"lg"}
                className="text-black bg-white border-2 border-black hover:border-color-sub hover:bg-color-sub hover:text-white"
                asChild
              >
                <Link href="/gallery">আরো দেখুন</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeGallery;
