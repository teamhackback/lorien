#!/bin/bash

host=${HOST:-lorien.hackback.tech}
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(cd $DIR && npm run build)
rsync -avr $DIR/build/ root@${host}:/lorien/frontend
