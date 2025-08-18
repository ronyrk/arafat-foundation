import { memo } from "react";
import { Button } from "@/components/ui/button";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import { GraduationCap, HandHeart, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import imag from "../../public/about-img.png";

// Static data - moved outside component to prevent re-creation
const FOUNDATION_DESCRIPTION = "আরাফাত ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক মূলত মানবকল্যাণে নিবেদিত সেবামূলক প্রতিষ্ঠান। এই প্রতিষ্ঠান মানবতার শিক্ষক, মানুষের মুক্তি ও শান্তির দূত, মানবসেবার আদর্শ, হযরত মুহাম্মদ সা.-এর দেখানো পথ অনুসরণ করে আর্তমানবতার সেবা, সমাজ সংস্কার, কর্মসংস্থান তৈরি, দারিদ্র্য বিমোচন, বহুমুখী শিক্ষা প্রকল্প পরিচালনা, ত্রাণ বিতরণ, স্বল্পমূল্যে বা বিনামূল্যে স্বাস্থ্যসেবা প্রদান। সর্বোপরি মৌখিক, লৈখিক ও আধুনিক সকল প্রচারমাধ্যম ব্যবহার করে মানুষকে মহান আল্লাহর আনুগত্য ও তাঁর রাসূলের অনুকরণে সত্য ও শান্তির পথে ডেকে এনে একটি আদর্শ কল্যাণসমাজ বিনির্মাণে যথাসাধ্য প্রচেষ্টা চালিয়ে যাচ্ছে।" as const;

// Service cards data - static to prevent re-creation
const SERVICE_CARDS = [
  {
    id: 'education',
    Icon: GraduationCap,
    title: 'শিক্ষা',
    ariaLabel: 'শিক্ষামূলক সেবা'
  },
  {
    id: 'service',
    Icon: HandHeart,
    title: 'সেবা',
    ariaLabel: 'মানবিক সেবা'
  },
  {
    id: 'dawah',
    Icon: UserRound,
    title: "দা'ওয়াহ",
    ariaLabel: 'দা\'ওয়াহ কার্যক্রম'
  }
] as const;

// Icon configuration - static to prevent re-creation
const ICON_CONFIG = {
  size: 80,
  strokeWidth: 2,
  absoluteStrokeWidth: true
} as const;

// Memoized service card component
type ServiceCardType = (typeof SERVICE_CARDS)[number];

const ServiceCard = memo(({ service }: { service: ServiceCardType }) => (
  <div
    className="basis-1/3 hover:text-color-sub bg-gray-100 border-[1px] shadow-lg border-color-main py-6 rounded-sm flex justify-center items-center flex-col transition-colors duration-200"
    role="region"
    aria-label={service.ariaLabel}
  >
    <div className="font-normal">
      <service.Icon {...ICON_CONFIG} />
    </div>
    <h3 className="text-[22px] font-semibold mt-2">
      {service.title}
    </h3>
  </div>
));

ServiceCard.displayName = "ServiceCard";

function About() {
  return (
    <section
      className="md:px-20 md:py-4 p-4 flex md:flex-row flex-col gap-x-4 gap-y-3"
      aria-labelledby="about-title"
    >
      {/* Image Section */}
      <div className="basis-2/5">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          src={imag}
          className="rounded-sm w-full h-auto"
          priority
          alt="আরাফাত ফাউন্ডেশনের কার্যক্রমের ছবি"
          quality={90}
          placeholder="blur"
        />
      </div>

      {/* Content Section */}
      <div className="basis-3/5 px-1">
        {/* Header */}
        <header>
          <h1
            id="about-title"
            className="text-[30px] font-semibold text-color-main"
          >
            আরাফাত ফাউন্ডেশন
          </h1>
          <hr className="border-b-2 border-color-sub w-20 mt-2" />
        </header>

        {/* Description */}
        <p className="text-lg pt-6 font-normal leading-relaxed">
          {FOUNDATION_DESCRIPTION}
        </p>

        {/* Call to Action */}
        <div className="py-4">
          <Button
            className="px-6 py-3 bg-color-main hover:bg-color-sub text-white transition-colors duration-200"
            size={"lg"}
            asChild
          >
            <Link prefetch={false}
              href="/about-us"
              prefetch={true}
              aria-label="আরাফাত ফাউন্ডেশন সম্পর্কে বিস্তারিত জানুন"
            >
              বিস্তারিত{" "}
              <span className="ml-1" aria-hidden="true">
                <TriangleRightIcon />
              </span>
            </Link>
          </Button>
        </div>

        {/* Service Cards */}
        <div
          className="py-2 flex flex-row md:gap-x-2 gap-x-1"
          role="group"
          aria-label="আরাফাত ফাউন্ডেশনের সেবাসমূহ"
        >
          {SERVICE_CARDS.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(About);