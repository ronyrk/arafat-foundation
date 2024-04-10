import About from "@/components/About";
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
    </div>
  );
}
