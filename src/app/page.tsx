import About from "@/components/About";
import Blog from "@/components/Blog";
import Child from "@/components/Child";
import HomeCarousel from "@/components/HomeCarousel";
import OurProject from "@/components/OurProject";




export default function Home() {
  return (
    <div className="">
      <HomeCarousel />
      <About />
      <OurProject />
      <Child />
      <Blog />
    </div>
  );
}
