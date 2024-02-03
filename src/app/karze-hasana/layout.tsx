import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";



export const metadata: Metadata = {
	title: "Karze Hasana",
	description: "Generated by Arafat Foundation",
};

export default function KarzeHasanaLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className="md:mx-24 mx-2 md:my-4 my-2">
			<div className="flex md:flex-row flex-col gap-4">
				<div className="basis-1/5">
					<Sidebar />
				</div>
				<div className="md:p-2 p-1  bg-white border-2 rounded-md basis-4/5">{children}</div>
			</div>
		</section>
	);
}
