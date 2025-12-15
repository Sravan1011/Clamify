"use client";

import { useState } from "react";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SearchHeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchHero({ onSearch, isLoading }: SearchHeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto space-y-8 text-center relative py-20">

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -z-10 animate-blob" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          Verify Any Claim<br />Instantly
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
          Harness the power of advanced AI to detect, analyze, and verify information from across the web in seconds.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center glass-panel p-2 rounded-2xl">
          <Search className="w-6 h-6 text-muted-foreground ml-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Paste a rumor, news headline, or claim here..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-lg placeholder:text-muted-foreground/50 font-mono"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="glass-button px-8 py-3 flex items-center gap-2"
          >
            {isLoading ? (
              <span className="animate-pulse">Verifying...</span>
            ) : (
              <>
                <span>Verify</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground font-mono"
      >
        <span className="opacity-50">Try:</span>
        {["Deepfakes in elections", "New health supplements", "Viral celebrity rumors"].map((item, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(item);
              onSearch(item);
            }}
            className="hover:text-primary transition-colors cursor-pointer border-b border-dashed border-muted-foreground/30 hover:border-primary"
          >
            "{item}"
          </button>
        ))}
      </motion.div>
    </div>
  );
}
