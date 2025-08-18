"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarIProps {
  name: string;
  path: string;
}

const data: NavbarIProps[] = [
  {
    name: "স্বাবলম্বীকরণ প্রকল্প",
    path: "/our-activities",
  },
  {
    name: "এতিমদের লালন-পালন ও শিক্ষাদান",
    path: "/our-activities/nurturing-and-teaching",
  },
  {
    name: "সাদাকাহ জারিয়াহ",
    path: "/our-activities/voluntary-charity",
  },
  {
    name: "ইফতার ও রমাদান ফুড বিতরণ",
    path: "/our-activities/iftar-and-Ramadan-food-distribution",
  },
  {
    name: "মসজিদ ভিত্তিক কুরআন শিক্ষা",
    path: "/our-activities/mosque-based-quran-education",
  },
  {
    name: "কর্জে হাসানা",
    path: "/our-activities/karze-hasana",
  },
];

function ActivitiesSidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-[#F1F1FA] border-2 rounded">
      {data.map((item, index) => (
        <Link prefetch={false}
          key={index}
          className={` pl-2 py-3 text-[15px] font-semibold rounded-md ${pathname === item.path
              ? "bg-color-main text-white"
              : " text-black  hover:bg-[#DDDCF0] hover:text-black"
            }`}
          href={item.path}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default ActivitiesSidebar;
