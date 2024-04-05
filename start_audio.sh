#!/bin/bash

sleep 60

echo "Database populated"

npx prisma generate
npm run prepareSpeech
npm run speech

echo "Audio generated"