"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Shield, Brain, FileText, Activity, Clock, Link as LinkIcon } from "lucide-react";
import clsx from "clsx";

interface VerificationResultProps {
    data: any;
    onReset: () => void;
}

export default function VerificationResult({ data, onReset }: VerificationResultProps) {
    const {
        claim,
        verdict,
        confidence_score,
        truth_probability,
        verdict_text,
        confidence_level,
        summary,
        sources,
        forensic_analysis,
        processing_time,
        download_url
    } = data;

    const isTrue = truth_probability >= 60;
    const isFalse = truth_probability <= 40;

    const statusColor = isTrue ? "text-emerald-500" : isFalse ? "text-rose-500" : "text-amber-500";
    const borderColor = isTrue ? "border-emerald-500/30" : isFalse ? "border-rose-500/30" : "border-amber-500/30";
    const glowColor = isTrue ? "shadow-emerald-500/20" : isFalse ? "shadow-rose-500/20" : "shadow-amber-500/20";

    return (
        <div className="w-full max-w-6xl mx-auto pb-20 px-4 pt-8 font-mono">
            {/* Header / Verdict */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={onReset}
                        className="glass-button text-xs flex items-center gap-2"
                    >
                        ← Verify another claim
                    </button>
                    {processing_time && (
                        <div className="text-xs text-muted-foreground flex items-center gap-2 uppercase tracking-widest glass-panel px-3 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            Processed in {processing_time}
                        </div>
                    )}
                </div>

                <div className={clsx("glass-panel p-8 md:p-12 shadow-2xl", borderColor, glowColor)}>
                    {/* Original Query */}
                    {claim && (
                        <div className="mb-8 pb-8 border-b border-white/10">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Original Query</div>
                            <p className="text-foreground/90 text-lg md:text-xl leading-relaxed font-display">&ldquo;{claim}&rdquo;</p>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Final Verdict</div>
                            <h2 className={clsx("text-6xl md:text-8xl font-bold font-display uppercase leading-none tracking-tighter drop-shadow-lg", statusColor)}>
                                {verdict_text || (isTrue ? "VERIFIED" : isFalse ? "DEBUNKED" : "UNCERTAIN")}
                            </h2>
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold">
                                    <span>Confidence:</span>
                                    <span className={statusColor}>{(confidence_score * 100).toFixed(0)}%</span>
                                </div>
                                {confidence_level && (
                                    <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold">
                                        <span>Level:</span>
                                        <span className="text-foreground">{confidence_level}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Truth Probability</div>
                                <div className={clsx("text-5xl font-bold font-display", statusColor)}>{truth_probability.toFixed(0)}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Summary */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-6 font-display uppercase flex items-center gap-2">
                            <Brain className="w-5 h-5 text-primary" />
                            AI Analysis
                        </h3>
                        <div className="text-foreground/80 leading-relaxed text-base md:text-lg">
                            <p>{summary}</p>
                        </div>
                    </motion.section>

                    {/* Sources */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-6 font-display uppercase flex items-center gap-2">
                            <LinkIcon className="w-5 h-5 text-primary" />
                            Evidence Sources
                        </h3>
                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {sources && sources.length > 0 ? (
                                sources.map((source: any, i: number) => (
                                    <div key={i} className="space-y-2">
                                        {source.results && source.results.map((res: any, j: number) => (
                                            <a
                                                key={`${i}-${j}`}
                                                href={res.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block group glass-panel p-4 hover:bg-white/10 transition-colors rounded-xl overflow-hidden"
                                            >
                                                <h4 className="font-bold text-foreground text-sm group-hover:text-primary mb-2 uppercase break-words line-clamp-2">
                                                    {res.title}
                                                </h4>
                                                <p className="text-xs text-muted-foreground font-mono opacity-70 break-all line-clamp-1">
                                                    {res.url}
                                                </p>
                                            </a>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-muted-foreground text-sm italic">No sources found.</div>
                            )}
                        </div>
                    </motion.section>


                    {download_url && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-8"
                        >
                            <h3 className="text-xl font-bold text-foreground mb-6 font-display uppercase flex items-center gap-2">
                                <FileText className="w-5 h-5 text-green-500" />
                                Full Report
                            </h3>

                            <div className="space-y-4">
                                <a
                                    href={download_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold uppercase py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                                >
                                    <FileText className="w-4 h-4" />
                                    Download AEP Report
                                </a>
                                <p className="text-xs text-muted-foreground text-center font-mono">
                                    Comprehensive PDF with all evidence and analysis
                                </p>
                            </div>
                        </motion.section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Forensic Analysis */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <h3 className="text-xl font-bold text-foreground mb-6 font-display uppercase flex items-center gap-2">
                            <Shield className="w-5 h-5 text-purple-500" />
                            Forensics
                        </h3>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-xs uppercase text-muted-foreground">Forensic Verdict</span>
                                <span className="text-sm font-bold uppercase text-foreground">{forensic_analysis.verdict || "UNKNOWN"}</span>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs uppercase mb-2">
                                    <span className="text-muted-foreground">Integrity Score</span>
                                    <span className="text-foreground">{(forensic_analysis.integrity_score * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full"
                                        style={{ width: `${forensic_analysis.integrity_score * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs uppercase mb-2">
                                    <span className="text-muted-foreground">AI Probability</span>
                                    <span className="text-foreground">{(forensic_analysis.ai_probability * 100).toFixed(0)}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-foreground rounded-full"
                                        style={{ width: `${forensic_analysis.ai_probability * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* AI Indicators */}
                            {forensic_analysis.ai_indicators && forensic_analysis.ai_indicators.length > 0 && (
                                <div className="pt-4">
                                    <p className="text-xs font-bold text-muted-foreground uppercase mb-3">AI Indicators</p>
                                    <ul className="space-y-2">
                                        {forensic_analysis.ai_indicators.slice(0, 3).map((indicator: string, i: number) => (
                                            <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                                                <span className="text-purple-500 mt-0.5">●</span>
                                                {indicator}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {forensic_analysis.penalties.length > 0 && (
                                <div className="pt-6 border-t border-white/10">
                                    <p className="text-xs font-bold text-muted-foreground uppercase mb-4">Red Flags Detected</p>
                                    <ul className="space-y-3">
                                        {forensic_analysis.penalties.map(([flag, score]: any, i: number) => (
                                            <li key={i} className="text-xs text-destructive flex justify-between items-center uppercase bg-destructive/5 p-2 rounded-lg border border-destructive/10">
                                                <span>{flag}</span>
                                                <span className="font-bold">-{score.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.section>

                </div>
            </div>
        </div>
    );
}
