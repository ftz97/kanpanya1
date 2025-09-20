#!/usr/bin/env bash
set -euo pipefail
if grep -R "@/components/ui/Button" -n src; then
  echo "❌ Uppercase import detected: use '@/components/ui/button'"
  exit 1
fi
