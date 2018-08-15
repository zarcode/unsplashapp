 #!/usr/bin/env bash

# runs
cd src && touch config.json
echo $API_KEYS | awk '{print "{ \"keys\": ["}{for (i = 1; i <=NF; i++){ print "\"" $i "\""; if(i < NF) print ","}}{print "]}"}' > config.json