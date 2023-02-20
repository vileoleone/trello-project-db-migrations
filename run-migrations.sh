#!/bin/bash

docker exec -it callcenter-db_db_1 mysql -u root -pcallcenter -e "DROP DATABASE IF EXISTS callcenter"
docker exec -it callcenter-db_db_1 mysql -u root -pcallcenter -e "CREATE DATABASE callcenter DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci"
export DATABASE_URL='mysql://callcenter:callcenter@0.0.0.0:3306/callcenter'
node migrator.js --up
