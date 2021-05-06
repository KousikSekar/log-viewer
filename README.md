# log-viewer
## Description :
Reads your /var/log/rave/* files and provides you a pretty json view for many services, you can switch between different log files easily and also filter logs using keywords ,

Make sure to clone the repository into your home location

## How to Run : 
* cd ./log-viewer

### Step 1) Configure backend API :
* vi ./backend/main.go
* change CORS_ENABLED_IP = http://<your VM's IP address> :8877

### Step 2) Configure Frontend API :
* vi /frontend/api/src/api.js
* change baseURL = 'http:// <your VM's IP address> :8787/logs/'

### Step 3) Deploy in docker :
* chmod 711 deploy.sh
* run deploy.sh file to build and run in docker

### your application should be running at port 8877
