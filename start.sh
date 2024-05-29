#!/bin/bash

directory="."
file=".db_filled"

function wait_for_host() {
    while ! timeout 1 bash -c "cat < /dev/null > /dev/tcp/$1/$2" > /dev/null 2>&1; do
        echo "Waiting for the server $1:$2 to start"
        sleep 1
    done
}

function load_env() {
    if [ -f .env ]; then
        export $(grep -E "^[^#]" .env | xargs)
    else
        echo "No .env file found"
        exit 1
    fi
}

load_env
wait_for_host $DATABASE_HOST $DATABASE_PORT

# Check if the file exists
# If the file does not exist, run a few commands
if [ ! -f "$directory/$file" ]; then
    # Populate the database
    echo "Populating database. Running commands..."
    npx prisma migrate dev --skip-seed
    npx prisma db seed

    # Convert all the text to speech
    echo "Converting text to speech. Running commands..."
    wait_for_host $TTS_HOST $TTS_PORT
    npm run prepareSpeech
    npm run speech

    if [ "$NODE_ENV" = "development" ]; then
        echo "Notice: Copy the content of out/*.wav to the public folder (public/audio) to serve the audio files."
    fi

    touch .db_filled
fi

if [ "$NODE_ENV" = "production" ]; then
    npm run start
else
    npm run dev
fi
