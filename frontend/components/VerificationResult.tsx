"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, ExternalLink, Shield, FileText, Search, Brain } from "lucide-react";
import clsx from "clsx";

interface VerificationResultProps {
    data: {
        verdict: "True" | "False" | "Misleading" | "Unverified";
        confidence_score: number;
        summary: string;
        sources: Array<{ title: string; url: string; reliability: string }>;
        forensic_analysis?: string;
    };
    onReset: () => void;
}

export default function VerificationResult({ data, onReset }: VerificationResultProps) {
    const isTrue = data.verdict === "True";
    const isFalse = data.verdict === "False";
    const isMisleading = data.verdict === "Misleading";

    const statusColor = isTrue ? "text-green-500" : isFalse ? "text-red-500" : "text-yellow-500";
    const borderColor = isTrue ? "border-green-500/50" : isFalse ? "border-red-500/50" : "border-yellow-500/50";
    const glowColor = isTrue ? "shadow-green-500/20" : isFalse ? "shadow-red-500/20" : "shadow-yellow-500/20";
    const Icon = isTrue ? CheckCircle2 : isFalse ? XCircle : AlertTriangle;

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 space-y-8 pb-20">
            {/* Main Verdict Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={clsx(
                    "glass-panel p-8 md:p-12 text-center relative overflow-hidden transition-all duration-500",
                    borderColor,
                    "border-2",
                    glowColor,
                    "shadow-2xl"
                )}
            >
                <div className={clsx("absolute inset-0 opacity-10 blur-3xl", isTrue ? "bg-green-500" : isFalse ? "bg-red-500" : "bg-yellow-500")} />

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className={clsx("p-4 rounded-full glass-panel", statusColor)}>
                        <Icon className="w-16 h-16" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-tighter">
                            {data.verdict}
                        </h2>
                        <div className="flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
                            <Shield className="w-4 h-4" />
                            <span>Confidence Score: {data.confidence_score}%</span>
                        </div>
                    </div>

                    <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden max-w-xs mx-auto">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${data.confidence_score}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={clsx("h-full", isTrue ? "bg-green-500" : isFalse ? "bg-red-500" : "bg-yellow-500")}
                        />
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 space-y-4"
                >
                    <div className="flex items-center gap-2 text-primary font-display uppercase tracking-wider text-sm">
                        <FileText className="w-4 h-4" />
                        <h3>Analysis Summary</h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                        {data.summary}
                    </p>
                </motion.div>

                {/* Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 space-y-4"
                >
                    <div className="flex items-center gap-2 text-primary font-display uppercase tracking-wider text-sm">
                        <Search className="w-4 h-4" />
                        <h3>Verified Sources</h3>
                    </div>
                    <div className="space-y-3">
                        {data.sources.map((source, i) => (
                            <a
                                key={i}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start justify-between group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                                        {source.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                        {new URL(source.url).hostname}
                                    </p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Forensic Analysis */}
            {data.forensic_analysis && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 space-y-4"
                >
                    <div className="flex items-center gap-2 text-primary font-display uppercase tracking-wider text-sm">
                        <Brain className="w-4 h-4" />
                        <h3>Forensic Analysis</h3>
                    </div>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80">
                        {data.forensic_analysis}
                    </div>
                </motion.div>
            )}

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="glass-button"
                >
                    Verify Another Claim
                </button>
            </div>
        </div>
    );
}
