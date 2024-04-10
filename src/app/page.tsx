import About from "@/components/About";
import HomeCarousel from "@/components/HomeCarousel";
import OurProject from "@/components/OurProject";


export default function Home() {
  return (
    <div className="">
      <HomeCarousel />
      <About />
      <OurProject />
    </div>
  );
}
