#!/bin/sh
cd ~/documents/Personal/React/RNTodoApp
echo "Pulling from RNTodoApp"
git pull
echo "Bundle RNTodoApp for Release"
npm run bundle-android
echo "Finished bundle RNTodoApp"
