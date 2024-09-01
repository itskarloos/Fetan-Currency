
"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const banks = [
  {
    value: "Cbe",
    label: "Cbe",
  },
  {
    value: "Dashen",
    label: "Dashen",
  },
  {
    value: "Abysinya",
    label: "Abysinya",
  },
  {
    value: "Zemen",
    label: "Zemen",
  },
  {
    value: "Wegagen",
    label: "Wegagen",
  },
]



const ExchangeCard = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[full] md:w-[200px] justify-between text-gray-300 bg-black border-gray-700 hover:bg-gray-700 hover:text-gray-200"
      >
        {value
          ? banks.find((bank) => bank.value === value)?.label
          : "Select Bank..."}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0 bg-black border-gray-700">
      <Command className="bg-black">
        <CommandInput placeholder="Search Banks..." className=" text-gray-300" />
        <CommandList>
          <CommandEmpty className="text-gray-400">No Banks Found</CommandEmpty>
          <CommandGroup>
            {banks.map((bank) => (
              <CommandItem
                key={bank.value}
                value={bank.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
                className="text-white"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === bank.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {bank.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
  )

  
}

export default ExchangeCard