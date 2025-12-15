"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export interface Log {
    type: string;
    agent: string;
    message: string;
}

interface VerificationProgressProps {
    logs: Log[];
    sources?: any[];
}

export default function VerificationProgress({ logs, sources = [] }: VerificationProgressProps) {
    return (
        <div className="w-full max-w-4xl mx-auto mt-12 px-4 font-mono">
            <div className="glass-panel p-6 md:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        System Status: <span className="text-green-500">ACTIVE</span>
                    </h3>
                    <div className="text-xs text-muted-foreground glass-panel px-2 py-1 rounded">
                        PROTOCOL_V2.0
                    </div>
                </div>

                <div className="space-y-6 relative">
                    {/* Timeline line */}
                    <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/10" />

                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative pl-6"
                        >
                            <div className="absolute left-0 top-1.5 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-background/10" />
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                <span className="text-xs font-bold text-primary uppercase min-w-[120px]">
                                    [{log.agent || "SYSTEM"}]
                                </span>
                                <span className="text-sm text-foreground/80 break-all">
                                    {log.message}
                                </span>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 text-muted-foreground pt-4 pl-6"
                    >
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs uppercase tracking-wider">Processing...</span>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
