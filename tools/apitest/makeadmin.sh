#!/bin/bash

# curl script to create admin

curl -i -X POST -H "Content-Type: application/json" --data-binary '{"email":"chia_jason96@live.com","name":"admin","password":"test123"}' http://localhost:1996/user/add -v
