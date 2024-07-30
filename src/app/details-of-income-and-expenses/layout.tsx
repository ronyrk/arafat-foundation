import IncomeAndExpensesSidebar from "@/components/IncomeAndExpensesSidebar";
import type { Metadata } from "next";
import Link from "next/link";



export const metadata: Metadata = {
    title: "ব্যায়ের হিসাব ",
    description: "Generated by Arafat Foundation",
};

export default function IncomeAndExpensesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="bg-[#FCFCFD]">
            <div className="md:mx-20 bg-[#FCFCFD] md:my-4 py-2">
                <div className="my-3 bg-[#FCFCFD] text-center">
                    <div className="my-4 bg-[#FCFCFD] flex justify-center mx-2">
                        <h2 className=" font-medium md:text-2xl text-lg border-dashed border-2 border-indigo-600 rounded px-2 ">আমাদের আয় এবং ব্যায়ের হিসাব সমূহ</h2>
                    </div>
                    <div className="bg-[#FCFCFD]">
                        <h3 className=" text-base mb-4 text-color-main font-medium">প্রিয় “ভাই/বোন” আপনার অনুদান আমাদের কাছে আমানত। আমাদের কাছে অনুদান পাঠানোর ২৪ ঘন্টার মধ্যে নিচের লিস্ট/
                            <Link className=' text-green-500 mx-1' href="/details-of-income-and-expenses/income">Income</Link>
                            আপনার অনুদান
                            জমা হয়েছে কি না সেটি চেক করার অনুরোধ রইলো । আপনার অনুদানটি এখানে জমা না হলে আমাদের সাথে  <Link className=' text-green-500' href="/contact-us">যোগাযোগ করুন</Link> ।
                        </h3>
                        <h3 className="mt-2  text-base text-color-main font-medium">আপনি যদি নির্দিষ্ট কোনো কাজ/প্রজেক্টের জন্য আমাদেরকে অনুদান দিয়ে থাকেন তবুও নিচের লিস্ট/<Link className=' text-green-500 mx-1' href="/details-of-income-and-expenses">Expenses</Link> থেকে নির্দিষ্ট কাজে এবং নির্দিষ্ট দিনে খরচ
                            করা হয়েছে কি না সেটা চেক করার অনুরোধ রইলো ।
                        </h3>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="basis-1/5">
                        <IncomeAndExpensesSidebar />
                    </div>
                    <div className=" md:px-2 bg-white  rounded-md border-[2px] px-1 py-2 basis-4/5">{children}</div>
                </div>
            </div>
        </section>
    );
}