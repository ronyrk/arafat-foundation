import About from "@/components/About";
import Blog from "@/components/Blog";
import Child from "@/components/Child";
import HomeCarousel from "@/components/HomeCarousel";
import HomeGallery from "@/components/HomeGallery";
import OurProject from "@/components/OurProject";
import prisma from "@/lib/prisma";




export default async function page({ searchParams }: {
  searchParams?: {
    type?: string,
    page?: string,
  }
}) {
  const firstItem = (await prisma.category.findMany()).at(0);
  const query = searchParams?.type || firstItem?.path as string;
  return (
    <div className="">
      <HomeCarousel />
      <About />
      <OurProject />
      <HomeGallery query={query} />
      <Child />
      <Blog />
    </div>
  );
}
