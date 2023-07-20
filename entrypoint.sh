#!/bin/bash
set -e

case "$1" in
    start)
        cd /app
        npm run dev
        ;;
    *)
        exec "$@"
esac