"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DonorIProps } from "@/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { UploadButton } from "@/lib/uploading"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"


// Define the form schemas for both form types
const oldFormSchema = z.object({
    formType: z.literal("old"),
    amount: z.string().min(1, "Amount is required"),
    time: z.string().min(1, "Time is required"),
    username: z.string().min(1, "Username is required"),
    method: z.string().min(1, "Method is required"),
})

const newFormSchema = z.object({
    formType: z.literal("new"),
    name: z.string(),
    about: z.string().optional(),
    phone: z.string().min(1, "Phone is required"),
    lives: z.string().min(1, "Lives is required"),
    hometown: z.string().min(1, "Hometown is required"),
    amount: z.string().min(1, "Amount is required"),
    time: z.string().min(1, "Time is required"),
    method: z.string().min(1, "Method is required"),
    imageUpload: z.string(),
})

// Combined schema with discriminated union
const formSchema = z.discriminatedUnion("formType", [oldFormSchema, newFormSchema])




export default function SidebarButton({ donors }: { donors: DonorIProps[] }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formType, setFormType] = useState<"old" | "new">("old");

    const [searchTerm, setSearchTerm] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const [isValid, setIsValid] = useState(true)

    // Filter data based on search term
    const filteredData = donors.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.code.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleValueChange = (username: string) => {
        setSelectedValue(username)
        // Simple validation - check if the value exists in our data
        const isValidValue = donors.some((item) => item.username === username)
        setIsValid(isValidValue)
    }

    // Initialize the form with react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            formType: "old",
            amount: "",
            time: "",
            method: "",
        },
    })

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        try {
            // Determine which API endpoint to use based on form type
            const endpoint = values.formType === "old" ? "/api/donor_payment_request" : "/api/donor_request"

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            const data = await response.json();
            if (response.status === 200) {
                // Handle success response
                toast.success("Form submitted successfully")
                form.reset() // Reset the form after successful submission
                setDialogOpen(false) // Close the dialog

            } else {
                // Handle error response
                toast.error(data.message || "An error occurred")
            }
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle form type change
    const handleFormTypeChange = (value: "old" | "new") => {
        setFormType(value)

        // Update form values when switching form types
        form.setValue("formType", value)

        // Reset form fields
    }
    return (
        <div>
            <div className="pb-4" >
                <Button variant={"ghost"} className="pl-4 py-4 text-[15px] font-semibold rounded-md" onClick={() => setDialogOpen(true)}>Open Form</Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">


                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="sm:max-w-[550px]">
                        <DialogHeader>
                            <DialogDescription className="text-center text-base font-medium text-color-main">
                                Please send your donation to the given bKash or bank accounts below.
                                bKash A/C Number: 01738115411 (Send Money) <span className="mx-1"></span>
                                Islami Bank Bangladesh Ltd
                                A/C Number: 20501130203541208 <span className="mx-1"></span>
                                A/C Name: Abdullah Al Mamun
                                Branch Name: Rajshahi <span className="mx-1"></span>
                                Routing Number: 125811932<span className="mx-1"></span>
                                SWIFT Code: IBBLBDDH113 <span className="mx-1"></span>
                                আপনার অনুদানের তথ্যগুলো দিয়ে সহযোগিতা করুন।

                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-1">
                                    {/* Form Type Selection */}
                                    <FormField
                                        control={form.control}
                                        name="formType"
                                        render={({ field }) => (
                                            <FormItem className="space-y-0">

                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={(value: "old" | "new") => {
                                                            field.onChange(value)
                                                            handleFormTypeChange(value)
                                                        }}
                                                        defaultValue={field.value}
                                                        className="flex space-x-2"
                                                    >
                                                        <FormItem className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value="old" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal cursor-pointer">I am an existing donor</FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-2">
                                                            <FormControl>
                                                                <RadioGroupItem value="new" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal cursor-pointer">I am a new donor</FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Common Fields for Both Forms */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 ">
                                        {
                                            formType === "new" && (
                                                <>
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Name</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Enter name" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="phone"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Phone</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Enter phone number" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="lives"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Lives</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Enter lives" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="hometown"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Hometown</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Enter hometown" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </>
                                            )
                                        }
                                        {
                                            formType === "old" && (
                                                <FormField
                                                    control={form.control}
                                                    name="username"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Select donor..</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={(value) => {
                                                                        field.onChange(value); // Update the form state
                                                                        handleValueChange(value); // Update the selected value
                                                                    }}
                                                                    defaultValue={field.value}
                                                                >
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Select option.." />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <div className="flex items-center px-3 pb-2">
                                                                            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                                                            <Input
                                                                                placeholder="Search..."
                                                                                className="h-8"
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                            />
                                                                        </div>
                                                                        {filteredData.length > 0 ? (
                                                                            <div className="max-h-[200px] overflow-auto">
                                                                                {filteredData.map((item) => (
                                                                                    <SelectItem
                                                                                        key={item.username}
                                                                                        value={item.username}
                                                                                        onClick={() => handleValueChange(item.username)}
                                                                                        className={cn("cursor-pointer hover:bg-color-sub/50")}
                                                                                    >
                                                                                        <div className="flex flex-row pr-1">
                                                                                            <span className="font-medium">{item.code}</span>
                                                                                            <span className="">--</span>
                                                                                            <span className="font-medium">{item.name}</span>
                                                                                        </div>
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="py-3 text-center text-sm">No results found</div>
                                                                        )}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                        }
                                        <FormField
                                            control={form.control}
                                            name="amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Amount</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter amount" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="time"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select option" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="life-time">One time grant</SelectItem>
                                                            <SelectItem value="6-months">Loan for 6 months</SelectItem>
                                                            <SelectItem value="1-years">Loan for 1 years</SelectItem>
                                                        </SelectContent>
                                                    </Select>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="method"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Method</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter method" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Additional Fields for New Form */}
                                    {formType === "new" && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="about"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>About</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Bio" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="imageUpload"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className=" flex justify-center">Profile Picture</FormLabel>
                                                        <FormControl>
                                                            <UploadButton
                                                                className="ut-button:bg-color-sub  ut-button:ut-readying:bg-color-sub/80"
                                                                endpoint="imageUploader"
                                                                onClientUploadComplete={(res) => {
                                                                    // Do something with the response
                                                                    field.onChange(res[0].url)
                                                                    toast.success("Image Upload successfully")
                                                                }}
                                                                onUploadError={(error: Error) => {
                                                                    // Do something with the error.
                                                                    toast.error(error.message);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                </CardContent>

                                <CardFooter>
                                    <Button type="submit" disabled={isSubmitting} className="w-full">
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit"
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
