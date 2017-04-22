#!/bin/bash

host=${HOST:-lorien.hackback.tech}
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rsync -avr --exclude venv --exclude __pycache__ $DIR/ root@${host}:/lorien/backend
