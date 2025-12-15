"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function About() {
    return (
        <main className="min-h-screen text-foreground selection:bg-primary/30 overflow-x-hidden font-mono">
            <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto">
                <Navbar />

                <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 pt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl space-y-12"
                    >
                        {/* Header */}
                        <div className="text-center space-y-6">
                            <h1 className="text-5xl md:text-7xl font-bold font-display uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                                Verifying Truth in the Age of AI
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl font-mono uppercase tracking-widest glass-panel inline-block px-6 py-2 rounded-full">
                                Trust but Verify
                            </p>
                        </div>

                        {/* Mission Statement */}
                        <div className="glass-card p-8 md:p-12 text-center space-y-6">
                            <h2 className="text-2xl font-bold font-display uppercase">Our Mission</h2>
                            <p className="text-foreground/90 text-lg leading-relaxed max-w-2xl mx-auto">
                                In an era of information overload and AI-generated content, distinguishing fact from fiction has never been more critical. <span className="font-bold text-primary">Claime AI</span> is dedicated to providing instant, accurate, and transparent verification of claims found online.
                            </p>
                        </div>

                        {/* How it Works */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-panel p-6 space-y-4 hover:bg-white/10 transition-colors rounded-2xl">
                                <div className="text-4xl font-bold text-primary/20">01</div>
                                <h3 className="text-xl font-bold font-display uppercase text-primary">Detect</h3>
                                <p className="text-foreground/80 leading-relaxed text-sm">
                                    Our advanced algorithms scan text to identify key claims and factual assertions that require verification.
                                </p>
                            </div>
                            <div className="glass-panel p-6 space-y-4 hover:bg-white/10 transition-colors rounded-2xl">
                                <div className="text-4xl font-bold text-primary/20">02</div>
                                <h3 className="text-xl font-bold font-display uppercase text-primary">Analyze</h3>
                                <p className="text-foreground/80 leading-relaxed text-sm">
                                    We cross-reference claims against a vast database of trusted sources, scientific papers, and verified news outlets.
                                </p>
                            </div>
                            <div className="glass-panel p-6 space-y-4 hover:bg-white/10 transition-colors rounded-2xl">
                                <div className="text-4xl font-bold text-primary/20">03</div>
                                <h3 className="text-xl font-bold font-display uppercase text-primary">Verify</h3>
                                <p className="text-foreground/80 leading-relaxed text-sm">
                                    Get instant results with detailed sources, context, and a reliability score for every claim analyzed.
                                </p>
                            </div>
                        </div>

                        {/* Commitment */}
                        <div className="text-center pt-8 border-t border-white/10">
                            <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">
                                Powered by Advanced AI & Human Fact-Checking Standards
                            </p>
                        </div>

                    </motion.div>
                </div>

                <footer className="py-8 px-6 text-center text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    © {new Date().getFullYear()} Claime AI. All Rights Reserved.
                </footer>
            </div>
        </main>
    );
}
