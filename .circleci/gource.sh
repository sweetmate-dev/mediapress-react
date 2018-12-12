gource \
   -s 1 \
   -1920x1080 \
   --auto-skip-seconds 0.5 \
   --multi-sampling \
   --stop-at-end \
   --key \
   --highlight-users \
   --hide mouse,progress \
   --background-colour 000000 \
   --font-size 22 \
   --title "Mediapress Frontend" \
   --output-ppm-stream - \
   --output-framerate 30 \
    | avconv -y -r 30 -f image2pipe -vcodec ppm -i - -b 65536K movie.mp4
