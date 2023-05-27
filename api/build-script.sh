#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "pre-release" ]]; then
    echo "✅ - Realizando Build para Preview"
    exit 0;
elif [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
    echo "✅ - Realizando Build para Production"
    exit 0;
else
    echo "🛑 - Build cancelada, branch não permitida para deploy"
    exit 2;
fi
