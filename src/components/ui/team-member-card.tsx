import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface TeamMemberCardProps {
    id?: string,
    username: string,
    name: string,
    email: string,
    photos: string,
    facebook: string,
    linkedin: string,
    phone: string,
    about: string,
    type: string
    large?: boolean
}

export function TeamMemberCard({ name, type, about, phone, linkedin, facebook, photos, email, username, large = false }: TeamMemberCardProps) {
    return (
        <div className={`relative flex flex-col items-center ${large ? 'max-w-sm mx-auto' : 'w-full'}`}>
            <div className={`w-full aspect-square relative flex flex-col items-center justify-center rounded-lg overflow-hidden bg-gradient-to-t from-[#2D2150] from-70% to-[#FF9666] to-30% group hover:shadow-xl transition-shadow duration-300`}>
                <div className={`absolute top-[10%] flex justify-center items-center `}>
                    <div className={`relative ${large ? 'w-40 h-40' : 'w-32 h-32'} rounded-full overflow-hidden bg-white`}>
                        <Image
                            src={photos}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="absolute bottom-[80px] flex flex-col items-center">
                    <h3 className="text-white font-medium text-center">{name}</h3>
                    <p className="text-gray-200 text-sm mb-2">{type}</p>
                    <Button
                        variant="secondary"
                        className="bg-[#FF9666] hover:bg-[#ff8652] text-white text-xs px-4 py-1 h-7"
                        asChild
                    >
                        <Link href={`/team-member/${username}`}>
                            DETAILS
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

