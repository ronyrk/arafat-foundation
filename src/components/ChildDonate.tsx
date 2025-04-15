"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"
import { Textarea } from "./ui/textarea"
import Link from "next/link"
import { UploadButton } from "@/lib/uploading"
import toast from "react-hot-toast"
import { ChildDonateProps, ChildIProps } from "@/types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"



const formSchema = z.object({
    amount: z.string(),
    email: z.string(),
    name: z.string(),
    about: z.string().optional(),
    sendNumber: z.string().optional(),
    transactionId: z.string().optional(),
});


function ChildDonate({ data }: { data: ChildIProps }) {
    const router = useRouter();
    const [image, setImage] = useState<string | undefined>("");
    const [paymentType, setPaymentType] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setPaymentType(selectedValue)
    };

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ name, email, amount, photoUrl, method, about, type, transaction, sendNumber, childName }: ChildDonateProps) => {
            const response = await axios.post("/api/child-donate", {
                name, email, amount, photoUrl, about, method, type, transaction, sendNumber, childName
            });
            return response.data;
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        const amount = values.amount;
        const name = values.name;
        const email = values.email;
        const method = paymentType;
        const transaction = values.transactionId;
        const sendNumber = values.sendNumber;
        const about = values.about;
        const photoUrl = image;
        const type = selectedOption;
        const childName = data.username;


        mutate({ name, email, amount, photoUrl, about, method, type, transaction, sendNumber, childName }, {
            onSuccess: (item: ChildDonateProps) => {
                if (item?.id) {
                    toast.success("Donate Successfully");
                } else {
                    throw new Error("Donate Failed")
                }
                router.push(`/sponsor-a-child/${item.childName}`);
            },
            onError: (error) => {
                toast.error("Donate Failed");
            }
        });
    };

    return (
        <>
            <Card className="w-full max-w-md p-2 shadow-md rounded-lg">

                <div className=' bg-gray-200 rounded p-2'>
                    <h2 className="text-xl font-medium py-1">{data.name}</h2>
                    <p className="text-sm  font-medium pr-1 leading-relaxed">
                        {data.shortDes}
                    </p>

                    <div className="flex flex-col gap-1">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                <div className=" grid grid-cols-1 items-center gap-1">
                                    <div className="rounded">
                                        <div className="px-2 flex flex-col gap-2">
                                            <h2 className="my-1 font-medium text-xl">Payment From:</h2>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="radioGroup" // Group both radio buttons together
                                                    className=" text-2xl"
                                                    value="bangladesh"
                                                    checked={selectedOption === "bangladesh"}
                                                    onChange={handleOptionChange}
                                                    placeholder="Bangladesh"
                                                />
                                                <span className="px-4 text-lg">Bangladesh</span>
                                            </label>

                                            <label>
                                                <input
                                                    type="radio"
                                                    name="radioGroup" // Group both radio buttons together
                                                    value="outside"
                                                    checked={selectedOption === "outside"}
                                                    onChange={handleOptionChange}
                                                />
                                                <span className="px-4 text-lg">OutSide Bangladesh</span>
                                            </label>

                                        </div>
                                        {
                                            selectedOption === 'bangladesh' ? <div className="">
                                                <p className=" text-sm  font-medium leading-relaxed p-2">
                                                    <div dangerouslySetInnerHTML={{ __html: data.paymentInfo.split("^")[0] }} />
                                                </p>
                                            </div> : ""
                                        }
                                        {selectedOption === "outside" ?
                                            <div className="flex flex-col gap-2">
                                                <p className=" text-sm  font-medium leading-relaxed p-2">
                                                    <div dangerouslySetInnerHTML={{ __html: data.outsidePaymentInfo.split("^")[0] }} />
                                                </p>
                                                <Button className=" bg-green-500" asChild>
                                                    <Link prefetch={false} href={data.link}>Donate on</Link>
                                                </Button>
                                            </div> : ""}
                                    </div>

                                    {
                                        selectedOption ? <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" placeholder="Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> : ""
                                    }
                                    {
                                        selectedOption ? <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email or Phone</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" placeholder="email or Phone" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> : ""
                                    }
                                    {
                                        selectedOption ? <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Amount</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" type="number" placeholder=" Amount" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> : ""
                                    }
                                    {
                                        selectedOption === 'bangladesh' ? <div className=" rounded">
                                            <label htmlFor="paymentType" className="block mb-1 font-medium">
                                                Payment Method:-
                                            </label>
                                            <select
                                                id="paymentType"
                                                value={paymentType}
                                                onChange={handleTypeChange}
                                                className="w-full border rounded px-1 py-[1px] cursor-pointer"
                                            >
                                                <option value="">Select a payment Method</option>
                                                <option value="mobile-banking">Mobile Banking</option>
                                                <option value="bank-transfer">Bank Transfer</option>
                                            </select>
                                        </div> : ""
                                    }

                                    {
                                        paymentType === "mobile-banking" ? <FormField
                                            control={form.control}
                                            name="sendNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sender Number</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" placeholder=" Phone" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> : ""
                                    }
                                    {
                                        paymentType === "mobile-banking" ? <FormField
                                            control={form.control}
                                            name="transactionId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Transaction ID</FormLabel>
                                                    <FormControl>
                                                        <Input className="bg-white" placeholder=" Transaction ID" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> : ""
                                    }
                                    {
                                        (selectedOption === "outside" || paymentType === "bank-transfer")
                                            ? (
                                                <div className="flex flex-row py-2">
                                                    <h2 className="text-lg font-medium">File:-</h2>
                                                    <UploadButton
                                                        className="ut-button:bg-color-sub  w-[350px] ut-button:ut-readying:bg-color-sub/80"
                                                        endpoint="imageUploader"
                                                        onClientUploadComplete={(res) => {
                                                            // Do something with the response
                                                            setImage(res[0].url);
                                                            toast.success("Image Upload successfully")
                                                        }}
                                                        onUploadError={(error: Error) => {
                                                            // Do something with the error.
                                                            toast.error(error.message);
                                                        }}
                                                    />
                                                </div>
                                            ) : ""
                                    }

                                    {
                                        selectedOption ? <FormField
                                            control={form.control}
                                            name="about"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>About</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us a little bit about"
                                                            className="resize-none bg-white"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> : ""
                                    }

                                </div>
                                {
                                    (selectedOption === "" || isPending) ? "" : (<Button type="submit">Submit</Button>)
                                }
                            </form>
                        </Form>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default ChildDonate;