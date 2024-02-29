"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useFormState, useFormStatus } from 'react-dom'
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PaymentIProps } from '@/types'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { UploadButton } from '@/lib/uploading';
import Link from 'next/link'
import { useUser } from './ContextProvider'









function PaymentRequest({ username, branch }: { username: string, branch: string }) {
	const { user, isUserLoading } = useUser();


	return (
		<div className="py-2">
			{
				user?.username === branch &&
				<Button asChild>
					<Link href={`${username}/${branch}`}>Payment Request</Link>
				</Button>
			}
		</div>
	)
}

export default PaymentRequest