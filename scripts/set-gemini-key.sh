#!/bin/bash

# Script to set GEMINI_API_KEY environment variable
# Usage: source scripts/set-gemini-key.sh
# or: . scripts/set-gemini-key.sh

# Check if API key is provided as argument
if [ $# -eq 1 ]; then
    export GEMINI_API_KEY="$1"
    echo "✅ GEMINI_API_KEY set to: ${GEMINI_API_KEY:0:8}..."
else
    # Set placeholder key - replace with your actual API key
    export GEMINI_API_KEY="your_gemini_api_key_here"
    echo "⚠️  GEMINI_API_KEY set to placeholder value"
    echo "   Replace 'your_gemini_api_key_here' with your actual API key"
    echo ""
    echo "Usage options:"
    echo "  1. Edit this script and replace the placeholder"
    echo "  2. Run: source scripts/set-gemini-key.sh YOUR_ACTUAL_KEY"
    echo "  3. Create a .env file with GEMINI_API_KEY=your_key"
fi

# Verify the key is set
if [ -n "$GEMINI_API_KEY" ]; then
    echo "🔑 Environment variable GEMINI_API_KEY is now set"
    echo "   Run 'echo \$GEMINI_API_KEY' to verify"
else
    echo "❌ Failed to set GEMINI_API_KEY"
fi
