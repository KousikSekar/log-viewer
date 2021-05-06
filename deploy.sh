#!/bin/bash

echo "Downloading package github.com/gorilla/mux"
go get -v -u github.com/gorilla/mux
echo "--------------------------------------------------------------------"

echo "Starting backend api :--"
nohup go run ./backend/main.go &

echo -e "Trying to run api at PID : " $!
echo "--------------------------------------------------------------------"

echo "Starting to build docker image:--"
sudo docker build -t log-viewer-frontend ./frontend/.
echo "--------------------------------------------------------------------"

echo "Starting frontend application :--"
sudo docker run -d -p 8877:80 log-viewer-frontend
echo "--------------------------------------------------------------------"

echo "done"


