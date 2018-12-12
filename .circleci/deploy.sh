#!/bin/bash
if [ "$CIRCLE_BRANCH"  == "master" ]
then
   ssh -o StrictHostKeyChecking=no root@app.mediapress.io 'cd ~/mediapress-docker && bash ./launch-prod.sh'
else
   ssh -o StrictHostKeyChecking=no root@app.mediapress.io 'cd ~/mediapress-docker && bash ./launch-staging.sh'
fi
