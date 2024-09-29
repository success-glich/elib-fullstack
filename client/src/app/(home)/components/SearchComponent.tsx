
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { CalendarIcon, FacebookIcon, GitPullRequestArrowIcon, PersonStandingIcon, RocketIcon } from "lucide-react"

export function CommandDemo() {
    return (
        <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty  >

            </CommandList>
        </Command>
    )
}
/*
  <CommandGroup heading="Suggestions">
                    <CommandItem>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                        <FacebookIcon className="mr-2 h-4 w-4" />
                        <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem>
                        <RocketIcon className="mr-2 h-4 w-4" />
                        <span>Launch</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <CommandItem>
                        <PersonStandingIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                   
                //         <span>Mail</span>
                //         <CommandShortcut>⌘B</CommandShortcut>
                //     </CommandItem>
                //     <CommandItem>
                //         <GitPullRequestArrowIcon className="mr-2 h-4 w-4" />
                //         <span>Settings</span>
                //         <CommandShortcut>⌘S</CommandShortcut>
                //     </CommandItem>
                // </CommandGroup>

*/