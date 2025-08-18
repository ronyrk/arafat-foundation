"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock } from "lucide-react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import logo from "../../public/karze-hasana.png";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useUser } from "./ContextProvider";

function HeaderSlider() {
  const { user, setUser, isUserLoading } = useUser();
  const logOut = () => {
    setUser(null);
    localStorage.removeItem("username");
  };
  return (
    <div className=" bg-color-main">
      <div className="md:px-20 px-4 h-100 flex flex-row justify-between items-center py-2 mt-36">
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={logo}
          className="md:mr-4 mr-1 border-dashed rounded border-white md:pr-4 pr-1 border-r-2 md:w-32 w-16  h-10"
          alt="logo"
          placeholder="blur"
        />
        <div className="">
          <Marquee className="py-2">
            <div className="md:text-xl text-base text-white md:px-10 px-4">
              কর্জে হাসানা:- সুদ যেখানে হার মানতে বাধ্য (দরিদ্র এবং সুবিধা
              বঞ্চিতদের জন্য 100% সুদ-মুক্ত ঋণ ♦ কোন সুদ নেই ♦ কোন প্রসেসিং ফি
              নেই ♦ কোন গোপন চার্জ নেই ♦ কোন সার্ভিস চার্জ নেই ♦ কোন আবেদন ফি
              নেই♦ কোন লাভ নেই।)
            </div>
          </Marquee>
        </div>
        <div className=" px-2">
          {user?.username ? (
            <AlertDialog>
              <AlertDialogTrigger>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fetchPriority="high"
                    loading="eager"
                    alt="user"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely logout?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className=" text-color-main">
                    No
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={logOut}>Yes</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Link prefetch={false}
              href="/login"
              className="font-semibold leading-6 hover:text-color-sub"
            >
              <h2 className="text-white">
                <Lock className="w-4" />
              </h2>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderSlider;
