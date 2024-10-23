import { Button } from "@/components/ui/button";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import { GraduationCap, HandHeart, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import imag from "../../public/about-img.png";

function About() {
  return (
    <div className="md:px-20 md:py-4 p-4 flex md:flex-row flex-col gap-x-4 gap-y-3">
      <div className=" basis-2/5">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={imag}
          className=" rounded-sm"
          priority
          alt="about"
        />
      </div>
      <div className=" basis-3/5 px-1">
        <h2 className=" text-[30px] font-semibold text-color-main">
          আরাফাত ফাউন্ডেশন
        </h2>
        <hr className=" border-b-2 border-color-sub w-20" />
        <p className="text-lg pt-6 font-normal leading-relaxed">
          আরাফাত ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক মূলত মানবকল্যাণে নিবেদিত
          সেবামূলক প্রতিষ্ঠান। এই প্রতিষ্ঠান মানবতার শিক্ষক, মানুষের মুক্তি ও
          শান্তির দূত, মানবসেবার আদর্শ, হযরত মুহাম্মদ সা.-এর দেখানো পথ অনুসরণ
          করে আর্তমানবতার সেবা, সমাজ সংস্কার, কর্মসংস্থান তৈরি, দারিদ্র্য
          বিমোচন, বহুমুখী শিক্ষা প্রকল্প পরিচালনা, ত্রাণ বিতরণ, স্বল্পমূল্যে বা
          বিনামূল্যে স্বাস্থ্যসেবা প্রদান। সর্বোপরি মৌখিক, লৈখিক ও আধুনিক সকল
          প্রচারমাধ্যম ব্যবহার করে মানুষকে মহান আল্লাহর আনুগত্য ও তাঁর রাসূলের
          অনুকরণে সত্য ও শান্তির পথে ডেকে এনে একটি আদর্শ কল্যাণসমাজ বিনির্মাণে
          যথাসাধ্য প্রচেষ্টা চালিয়ে যাচ্ছে।
        </p>
        <div className="py-4">
          <Button
            className="px-6 py-3 bg-color-main hover:bg-color-sub text-white"
            size={"lg"}
            asChild
          >
            <Link href="/about-us">
              বিস্তারিত{" "}
              <span>
                <TriangleRightIcon />{" "}
              </span>
            </Link>
          </Button>
        </div>
        <div className="py-2 flex flex-row md:gap-x-2 gap-x-1">
          <div className=" basis-1/3  hover:text-color-sub bg-gray-100 border-[1px] shadow-lg border-color-main	 py-6 rounded-sm flex justify-center items-center flex-col">
            <h2 className=" font-normal">
              <GraduationCap size={80} strokeWidth={2} absoluteStrokeWidth />
            </h2>
            <h2 className=" text-[22px] font-semibold">শিক্ষা</h2>
          </div>
          <div className=" basis-1/3  hover:text-color-sub border-[1px] shadow-lg border-color-main py-6 rounded-sm flex justify-center items-center flex-col">
            <h2 className=" font-normal  hover:text-color-sub">
              <HandHeart size={80} strokeWidth={2} absoluteStrokeWidth />
            </h2>
            <h2 className=" text-[22px] font-semibold">সেবা</h2>
          </div>
          <div className=" basis-1/3  hover:text-color-sub border-[1px] shadow-lg border-color-main py-6 rounded-sm flex justify-center items-center flex-col">
            <h2 className=" font-normal  hover:text-color-sub">
              <UserRound size={80} strokeWidth={2} absoluteStrokeWidth />
            </h2>
            <h2 className=" text-[22px] font-semibold">দা‘ওয়াহ</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
