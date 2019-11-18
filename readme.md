# Project to learn Elasticsearch and Kibana

## Run on docker containers
### Prerequisites
* Docker 

### Build, run and kill 
* docker-compose build --no-cache
* docker-compose up -d 
* docker-compose down --volumes 

Example request that will show all pokemons that match "grass or poison": 
http://localhost:3000/pokemons/?text=grass%20poison

## Run locally
### Prerequisites
* Elasticsearch
* Node.js

### Setup Elasticsearch
* Download elasticsearch 
* run: cd elasticsearch-7.4.2/bin
* run: ./elasticsearch
* add one more node, run: ./elasticsearch -Epath.data=data2 -Epath.logs=log2

### Start app
* npm run start 
