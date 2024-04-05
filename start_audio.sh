#!/bin/bash

sleep 60

echo "Database populated"

npm run prepareSpeech
npm run speech

echo "Audio generated"