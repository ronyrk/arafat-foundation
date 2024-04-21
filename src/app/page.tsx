import About from "@/components/About";
import Blog from "@/components/Blog";
import Child from "@/components/Child";
import HomeCarousel from "@/components/HomeCarousel";
import HomeGallery from "@/components/HomeGallery";
import OurProject from "@/components/OurProject";




export default function page({ searchParams }: {
  searchParams?: {
    type?: string,
    page?: string,
  }
}) {
  const query = searchParams?.type || "all";
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
