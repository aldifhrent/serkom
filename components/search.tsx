import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useEffect, useState } from "react";
import { Search as SearchIcons } from "lucide-react";
import { useFetchBeasiswa } from "@/app/dashboard/hooks";
import Link from "next/link";
import { Beasiswa } from "@prisma/client";

const Search = () => {
  const [open, setOpen] = useState(false);
  const { data: beasiswa } = useFetchBeasiswa();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <SearchIcons className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search data" />
        <CommandList>
          {beasiswa && beasiswa.length > 0 ? (
            beasiswa.map((beasiswas: Beasiswa) => (
              <CommandGroup key={beasiswas.id}>
                <CommandItem>
                  <Link href={`/beasiswa/${beasiswas.id}`}>
                    <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                      {beasiswas.name}
                    </p>
                  </Link>
                </CommandItem>
              </CommandGroup>
            ))
          ) : (
            <CommandEmpty>No Results Found</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;
