"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";

interface SearchHeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchHero({ onSearch, isLoading }: SearchHeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center space-y-8 relative z-10">
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob -z-10" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          Verify Any Claim<br />Instantly
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Paste a statement, tweet, or news headline. Our multi-agent AI will analyze sources and determine the truth.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="relative max-w-2xl mx-auto group"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center glass-panel rounded-2xl p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50">
          <Search className="w-6 h-6 text-muted-foreground ml-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'The earth is flat' or 'Coffee reduces risk of heart disease'"
            className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-lg placeholder:text-muted-foreground/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="bg-primary text-primary-foreground p-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground"
      >
        <span>Try:</span>
        <button onClick={() => setQuery("Humans only use 10% of their brains")} className="hover:text-primary transition-colors underline decoration-dotted">10% Brain Myth</button>
        <button onClick={() => setQuery("Eating carrots improves night vision")} className="hover:text-primary transition-colors underline decoration-dotted">Carrots & Vision</button>
        <button onClick={() => setQuery("Lightning never strikes the same place twice")} className="hover:text-primary transition-colors underline decoration-dotted">Lightning Strikes</button>
      </motion.div>
    </div>
  );
}
