"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, ExternalLink, AlertCircle } from "lucide-react";

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (geminiKey: string, tavilyKey?: string) => void;
    initialGeminiKey?: string;
    initialTavilyKey?: string;
}

export default function ApiKeyModal({
    isOpen,
    onClose,
    onSave,
    initialGeminiKey = "",
    initialTavilyKey = "",
}: ApiKeyModalProps) {
    const [geminiKey, setGeminiKey] = useState(initialGeminiKey);
    const [tavilyKey, setTavilyKey] = useState(initialTavilyKey);
    const [showGeminiKey, setShowGeminiKey] = useState(false);
    const [showTavilyKey, setShowTavilyKey] = useState(false);

    useEffect(() => {
        setGeminiKey(initialGeminiKey);
        setTavilyKey(initialTavilyKey);
    }, [initialGeminiKey, initialTavilyKey]);

    const handleSave = () => {
        if (!geminiKey.trim()) {
            alert("Gemini API key is required!");
            return;
        }
        onSave(geminiKey.trim(), tavilyKey.trim() || undefined);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg glass-panel p-8 shadow-2xl"
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Key className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold font-display uppercase">API Configuration</h2>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Enter your API keys to use Claime AI. Keys are stored locally in your browser.
                        </p>
                    </div>

                    {/* Warning */}
                    <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            <div className="text-xs text-amber-200/90">
                                <p className="font-bold mb-1">Security Notice</p>
                                <p>Your API keys are stored locally and never saved on our servers. Keep them secure and don't share your device with untrusted parties.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Gemini API Key */}
                        <div>
                            <label className="block text-sm font-mono uppercase tracking-wider mb-2">
                                Google Gemini API Key <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showGeminiKey ? "text" : "password"}
                                    value={geminiKey}
                                    onChange={(e) => setGeminiKey(e.target.value)}
                                    placeholder="AIza..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-24 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    {showGeminiKey ? "Hide" : "Show"}
                                </button>
                            </div>
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
                            >
                                Get your Gemini API key <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        {/* Tavily API Key (Optional) */}
                        <div>
                            <label className="block text-sm font-mono uppercase tracking-wider mb-2">
                                Tavily API Key <span className="text-muted-foreground text-xs">(Optional)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showTavilyKey ? "text" : "password"}
                                    value={tavilyKey}
                                    onChange={(e) => setTavilyKey(e.target.value)}
                                    placeholder="tvly-..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-24 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowTavilyKey(!showTavilyKey)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    {showTavilyKey ? "Hide" : "Show"}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                                For web search functionality. If not provided, default search will be used.
                            </p>
                            <a
                                href="https://tavily.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-1 text-xs text-primary hover:underline"
                            >
                                Get your Tavily API key <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-mono uppercase text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!geminiKey.trim()}
                            className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-mono uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Keys
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
