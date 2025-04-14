"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { DonorIProps } from "@/types"

const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "strawberry", label: "Strawberry" },
    { value: "grape", label: "Grape" },
    { value: "watermelon", label: "Watermelon" },
    { value: "pineapple", label: "Pineapple" },
    { value: "mango", label: "Mango" },
    { value: "kiwi", label: "Kiwi" },
    { value: "peach", label: "Peach" },
]

function useDonor() {
    return useQuery({
        queryKey: ['donor'],
        queryFn: async (): Promise<Array<DonorIProps[]>> => {
            const response = await fetch('https://af-admin.vercel.app/api/donor')
            return await response.json()
        },
    })
}

export default function SidebarButton() {
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [value, setValue] = useState("");

    const { status, data, error, isFetching } = useDonor();

    console.log(data, "data")

    return (
        <div>
            <div className="pb-4" >
                <Button variant={"ghost"} className="pl-4 py-4 text-[15px] font-semibold rounded-md" onClick={() => setDialogOpen(true)}>Open Form</Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">


                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Form with Searchable Select</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label htmlFor="option" className="text-sm font-medium">
                                    Select an option
                                </label>

                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                                            {value ? options.find((option) => option.value === value)?.label : "Select option..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0" side="bottom" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search option..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No option found.</CommandEmpty>
                                                <CommandGroup>
                                                    {options.map((option) => (
                                                        <CommandItem
                                                            key={option.value}
                                                            value={option.value}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {option.label}
                                                            <Check
                                                                className={cn("ml-auto h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit">Submit</Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
