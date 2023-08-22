#!/bin/sh
set -e

sudo apt update
sudo apt upgrade -y

# install nodejs repo
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt install nodejs jq curl -y

git clone https://github.com/firaskhalayleh-it/newproject.git app
cd app 
npm install

npm run build 
sudo mv ./infrastructure/app.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable app.service
sudo systemctl start app

sudo reboot
