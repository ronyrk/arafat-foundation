import Image from "next/image";
import Marquee from "react-fast-marquee";
import logo from "../../public/karze-hasana.png";



function BeneficialSlider() {

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
                        <div className="md:text-xl tracking-wider	 text-base text-white md:px-10 px-4">
                            <span className="ml-20"> হজরত আবু হুরায়রাহ রাদিয়াল্লাহু আনহু থেকে বর্ণিত রাসূলুল্লাহ ﷺ বলেছেন, ‘মহান আল্লাহ কিয়ামতের দিন বলবেন, ‘হে আদম সন্তান! আমি অসুস্থ ছিলাম, তুমি আমাকে দেখাশুনা করনি।’ সে বলবে, ‘হে আমার রব! কিভাবে আমি আপনাকে দেখাশুনা করব, আপনি তো সৃষ্টিকুলের রব?’ তিনি বলবেন, ‘তুমি কি জানতে না যে, আমার অমুক বান্দা অসুস্থ হয়েছিল? অথচ তুমি তাকে দেখাশুনা করনি। তুমি কি জানতে না যে, তুমি যদি তাকে দেখাশুনা করতে, তাহলে অবশ্যই তুমি আমাকে তার কাছে পেতে? ♦
                            </span>
                            <span className="ml-20">হে আদম সন্তান! আমি তোমার কাছে খাবার চেয়েছিলাম, তুমি আমাকে খাওয়াওনি।’ সে বলবে, ‘হে আমার রব! আমি আপনাকে কিভাবে খাওয়াব, আপনি তো সৃষ্টিকুলের রব?’ আল্লাহ বলবেন, ‘তোমার কি জানা ছিল না যে, আমার অমুক বান্দা তোমার কাছে খাবার চেয়েছিল, কিন্তু তাকে তুমি খাবার দাওনি? তোমার কি জানা ছিল না যে, যদি তাকে খাওয়াতে, তাহলে অবশ্যই তা আমার কাছে পেতে? ♦
                            </span>
                            <span className="ml-20">হে আদম সন্তান! তোমার কাছে আমি পানি পান করতে চেয়েছিলাম, কিন্তু তুমি আমাকে পানি পান করাওনি।’ বান্দা বলবে, ‘হে আমার রব! আপনাকে কিরূপে পানি পান করাবো, আপনি তো সকল সৃষ্টির রব?’ তিনি বলবেন, ‘আমার অমুক বান্দা তোমার কাছে পানি চেয়েছিল, তুমি তাকে পানি পান করাওনি। তুমি কি জানতে না যে, যদি তাকে পানি পান করাতে, তাহলে তা অবশ্যই আমার কাছে পেতে?’♦</span>
                            <span className="ml-20"> -(মুসলিম ২৫৬৯, ইবনু হিব্বান ৯৪৪, সহীহ আদাবুল মুফরাদ ৫১৭, সহীহ আত্ তারগীব ৯৫২, সহীহ আল জামি‘ আস্ সগীর ১৯১৬)
                            </span>
                        </div>
                    </Marquee>
                </div>
            </div>
        </div>
    );
}

export default BeneficialSlider;
