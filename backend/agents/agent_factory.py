"""
Helper module to create agents with dynamic API keys.
This allows users to provide their own API keys via the frontend.
"""

import os
from agents.fact_checker import FactChecker
from agents.forensic_expert import ForensicExpert
from agents.judge import TheJudge


def create_agents_with_keys(gemini_key: str | None = None, tavily_key: str | None = None):
    """
    Create agent instances with provided API keys.
    Falls back to environment variables if keys not provided.
    
    Args:
        gemini_key: Google Gemini API key
        tavily_key: Tavily API key
        
    Returns:
        tuple: (fact_checker, forensic_expert, judge)
    """
    # Temporarily set environment variables for this request
    original_gemini = os.getenv("GOOGLE_API_KEY")
    original_tavily = os.getenv("TAVILY_API_KEY")
    
    try:
        # Use provided keys or fall back to environment
        if gemini_key:
            os.environ["GOOGLE_API_KEY"] = gemini_key
        if tavily_key:
            os.environ["TAVILY_API_KEY"] = tavily_key
            
        # Create new agent instances with the updated environment
        fact_checker = FactChecker()
        forensic_expert = ForensicExpert()
        judge = TheJudge()
        
        return fact_checker, forensic_expert, judge
        
    finally:
        # Restore original environment variables
        if original_gemini:
            os.environ["GOOGLE_API_KEY"] = original_gemini
        elif "GOOGLE_API_KEY" in os.environ:
            del os.environ["GOOGLE_API_KEY"]
            
        if original_tavily:
            os.environ["TAVILY_API_KEY"] = original_tavily
        elif "TAVILY_API_KEY" in os.environ:
            del os.environ["TAVILY_API_KEY"]
