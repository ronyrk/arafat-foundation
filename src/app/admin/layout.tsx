import AdminSidebar from "@/components/AdminSidebar";


export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<div className="md:mx-20 md:my-4 my-2">
				<div className="flex md:flex-row flex-col gap-4">
					<div className="basis-1/5 border-2 rounded">
						<AdminSidebar />
					</div>
					<div className="md:px-2 bg-white rounded-md border-[2px] px-1 py-2 basis-4/5">{children}</div>
				</div>
			</div>
		</section>
	);
}
