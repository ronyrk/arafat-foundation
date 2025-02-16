import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface TeamMemberCardProps {
    id?: string,
    type: string,
    name: string,
    position: string,
    photos: string,
    facebook: string,
    linkedin: string,
    mobile: string,
    description: string,
};

function htmlConvert(data: string) {
    const jsonAndHtml = data.split("^");
    const html = jsonAndHtml[0];

    return (
        <main className="py-2">
            <section dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    )
}

export function TeamMemberCard({ name, type, position, linkedin, facebook, photos, description, mobile }: TeamMemberCardProps) {
    return (
        <div className={`relative flex flex-col items-center w-full`}>
            <div className={`w-full aspect-square relative flex flex-col items-center justify-center rounded-lg overflow-hidden bg-gradient-to-t from-[#2D2150] from-65% to-[#FF9666] to-35% group hover:shadow-xl transition-shadow duration-300`}>
                <div className={`absolute top-[15%] flex justify-center items-center `}>
                    <div className={`relative w-32 h-32 rounded-full overflow-hidden bg-white`}>
                        <Image
                            src={photos}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="absolute top-[60%] flex flex-col items-center">
                    <h3 className="text-white font-medium text-center">{name}</h3>
                    <p className="text-gray-200 text-sm mb-2">{type}</p>
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                variant="secondary"
                                className="bg-[#FF9666] hover:bg-[#ff8652] text-white text-xs px-4 py-1 h-7"
                            >
                                DETAILS
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription>
                                    {htmlConvert(description)}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

