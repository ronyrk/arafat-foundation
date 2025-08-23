"use client";
import { BeneficialIProps } from '@/types'
import React, { Suspense } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { View, FileText, Eye } from 'lucide-react';
import Image from 'next/image';
import { useUser } from './ContextProvider';
import nidFont from "../../public/nid-font.png"
import nidBack from "../../public/nid-back.png"

function getStatus(item: BeneficialIProps): string {
    return item.beneficialDonorId ? "Active" : "Inactive";
}


function BeneficialDocuments({ data }: { data: BeneficialIProps }) {

    const { user, isUserLoading } = useUser();

    const DocumentViewButton = ({ children, title }: { children: React.ReactNode; title: string }) => (
        <Dialog>
            <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <Eye className="w-4 h-4" />
                    View
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
                        <FileText className="w-5 h-5 text-blue-600" />
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4 overflow-auto max-h-[calc(90vh-120px)]">
                    <Suspense fallback={
                        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg animate-pulse">
                            <div className="text-center">
                                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                                <p className="text-gray-600">Loading document...</p>
                            </div>
                        </div>
                    }>
                        {children}
                    </Suspense>
                </div>
            </DialogContent>
        </Dialog>
    );

    const ImageDisplay = ({ src, alt, isUserImage = false }: {
        src: string | any;
        alt: string;
        isUserImage?: boolean
    }) => (
        <div className="relative bg-white rounded-lg shadow-sm border overflow-hidden">
            <Image
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                src={src}
                alt={alt}
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                width={800}
                height={600}
                placeholder={!isUserImage ? 'blur' : undefined}
                quality={90}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 pointer-events-none"></div>
        </div>
    );

    return (
        <div className="basis-4/12 border-2 border-gray-200 hover:border-gray-300 rounded-xl px-4 py-4 flex flex-col bg-white shadow-sm transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="font-bold text-xl text-gray-800">Beneficial Documents</h2>
            </div>

            <div className="space-y-4 flex-1">
                {/* NID Front */}
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <h3 className="font-semibold text-gray-800">NID Front</h3>
                        </div>
                        <DocumentViewButton title="National ID - Front Side">
                            <ImageDisplay
                                src={user?.email ? data.nidFront : nidFont}
                                alt="NID Front Side"
                                isUserImage={!!user?.email}
                            />
                        </DocumentViewButton>
                    </div>
                </div>

                {/* NID Back */}
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <h3 className="font-semibold text-gray-800">NID Back</h3>
                        </div>
                        <DocumentViewButton title="National ID - Back Side">
                            <ImageDisplay
                                src={user?.email ? data.nidBack : nidBack}
                                alt="NID Back Side"
                                isUserImage={!!user?.email}
                            />
                        </DocumentViewButton>
                    </div>
                </div>
            </div>

            {/* Status indicator */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Donate Status:</span>
                    <div className="flex flex-col items-start gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatus(data) === 'Active'
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            {getStatus(data) === 'Active' ? '✅' : '⚠️'}
                            {getStatus(data)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BeneficialDocuments