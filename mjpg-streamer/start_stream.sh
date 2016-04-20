#!/bin/sh

cd /home/lps/Smart-Glasses/mjpg_streamer/
export LD_LIBRARY_PATH="$(pwd)"
./mjpg_streamer -i "./input_uvc.so -d /dev/video0 -r 1280x720 -f 15" -o "./output_http.so -p 9000 -w ./www"