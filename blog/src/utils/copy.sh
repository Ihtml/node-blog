#!/bin/sh
cd /Users/github/node-blog/blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log