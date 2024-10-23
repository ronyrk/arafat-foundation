import About from "@/components/About";
import Blog from "@/components/Blog";
import Child from "@/components/Child";
import HomeCarousel from "@/components/HomeCarousel";
import HomeGallery from "@/components/HomeGallery";
import OurProject from "@/components/OurProject";
import { unstable_noStore } from "next/cache";

export default async function page({
  searchParams,
}: {
  searchParams?: {
    type?: string;
    page?: string;
  };
}) {
  unstable_noStore();
  const query = searchParams?.type || "all";
  return (
    <div className="mt-36">
      <HomeCarousel />
      <About />
      <OurProject />
      <HomeGallery query={query} />
      <Child />
      <Blog />
    </div>
  );
}
