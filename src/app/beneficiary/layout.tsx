import BeneficialHeaderContent from "@/components/beneficial-header-content";
import BeneficialSidebar from "@/components/beneficial-sidebar";
import BeneficialSlider from "@/components/beneficial-slider";





export default function RootLayoutBeneficial({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="bg-[#FCFCFD]">
            <BeneficialSlider />
            <BeneficialHeaderContent />
            <div className="md:mx-20 md:my-4 my-2">
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="basis-1/5">
                        <BeneficialSidebar />
                    </div>
                    <div className=" md:px-6 bg-white  rounded-md border-[2px] px-1 py-2 basis-4/5">{children}</div>
                </div>
            </div>
        </section>
    );
}