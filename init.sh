 #!/bin/bash
cd /var/app || exit
yarn install && yarn build
next start