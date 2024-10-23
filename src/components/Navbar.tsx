"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignJustify,
  HandHeart,
  Linkedin,
  Mail,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../public/arafat-logo.png";

interface NavIProps {
  name: string;
  path: string;
}

const nav: NavIProps[] = [
  {
    name: "আমাদের সম্পর্কে",
    path: "about-us",
  },
  {
    name: "আমাদের কার্যক্রম",
    path: "our-activities",
  },
  {
    name: "গ্যালারি",
    path: "gallery",
  },
  {
    name: "কর্জে হাসানা",
    path: "karze-hasana",
  },
  {
    name: "ব্লগ",
    path: "blog",
  },
  {
    name: "যোগাযোগ",
    path: "contact-us",
  },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed w-full top-0 z-50 shadow-lg shadow-gray-300/40">
      <div
        id="top"
        className="flex items-center justify-between px-4 py-2 md:px-20 bg-color-main"
      >
        <div className=" flex flex-row gap-2 md:px-12 md:ml-[-38px] px-2 items-center">
          <a
            className="flex flex-row items-center gap-2"
            href="tel:01602505070"
          >
            <PhoneCall
              className="font-bold text-orange-400 cursor-pointer hover:text-orange-500"
              size={13}
            />
            <span className="text-white text-[13px] font-medium  hover:text-orange-400 cursor-pointer pr-2">
              01602505070
            </span>
          </a>
          <a
            className="flex flex-row items-center gap-2"
            href="mailto:contact@arafatfoundation.org"
          >
            <Mail
              className="font-bold text-orange-400 cursor-pointer hover:text-orange-500"
              size={13}
            />
            <span className="text-white text-[13px] font-medium  hover:text-orange-400 cursor-pointer pr-2">
              contact@arafatfoundation.org
            </span>
          </a>
        </div>
        <div className="flex-row items-center hidden gap-2 md:flex">
          <a
            href="/"
            className="text-white rounded px-[2px]  hover:text-orange-500 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="/"
            className="text-white rounded px-[2px]  hover:text-orange-500 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="/" className="text-white rounded px-[2px]">
            <Linkedin
              className="text-white cursor-pointer hover:text-orange-500"
              size={18}
            />
          </a>
        </div>
      </div>
      <div className="md:px-20 px-4 flex flex-row justify-between  bg-[#FFFFFF] gap-2 md:gap-0 items-center">
        <Link href="/">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-[120px] h-[100] py-2 object-contain rounded"
            src={Logo}
            placeholder="blur"
            alt="logo"
          />
        </Link>
        <div className="hidden md:flex">
          <Link
            href="/"
            className={`text-[16px] py-10 mx-3 font-semibold hover:border-color-sub hover:text-color-sub  border-b-4 ${
              pathname === "/"
                ? "border-color-sub text-color-sub"
                : "border-white"
            }`}
          >
            হোম
          </Link>
          {nav.map((item, index) => (
            <Link
              key={index}
              href={`/${item.path}`}
              className={`text-[16px] py-10 mx-3 font-semibold hover:border-color-sub hover:text-color-sub  border-b-4 ${
                pathname.startsWith(item?.path, 1)
                  ? "border-color-sub text-color-sub"
                  : "border-white"
              }`}
            >
              {item?.name}
            </Link>
          ))}
        </div>
        <div>
          <Button
            asChild
            className=" w-28 bg-color-main hover:bg-color-sub"
            size={"lg"}
          >
            <Link href="/our-projects">
              দান করুন{" "}
              <span className="ml-[6px]">
                <HandHeart />
              </span>
            </Link>
          </Button>
        </div>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <AlignJustify className="mr-4" size={30} />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <div className="flex flex-col gap-y-4">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={`text-[16px] mx-3 font-semibold hover:border-color-sub hover:text-color-sub border-b-4 ${
                      pathname === "/"
                        ? "border-color-sub text-color-sub"
                        : "border-white"
                    }`}
                  >
                    হোম
                  </Link>
                </SheetClose>
                {nav.map((item, index) => (
                  <SheetClose asChild key={index}>
                    <Link
                      href={`/${item.path}`}
                      className={`text-[16px] mx-3 font-semibold hover:border-color-sub hover:text-color-sub border-b-4 ${
                        pathname.startsWith(item?.path, 1)
                          ? "border-color-sub text-color-sub"
                          : "border-white"
                      }`}
                    >
                      {item?.name}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
