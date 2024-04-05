#!/bin/bash

directory="."
file=".db_filled"

# Check if the file exists
if [ ! -f "$directory/$file" ]; then
    # If the file does not exist, run a few commands
    echo "Populating database. Running commands..."
    # Commands
    sleep 5
    npx prisma migrate dev --skip-seed
    npx prisma db seed
    touch .db_filled
fi

npm run start
