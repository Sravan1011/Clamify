"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

interface NavbarProps {
    onReset?: () => void;
}

export default function Navbar({ onReset }: NavbarProps) {
    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div className="glass-panel px-6 py-3 flex items-center gap-8 rounded-full">
                <div
                    className="text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer font-display"
                    onClick={onReset}
                >
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-foreground">CLAIME</span>
                        <span className="text-primary">.AI</span>
                    </Link>
                </div>
                
                <div className="h-4 w-[1px] bg-border" />

                <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
                    <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}
