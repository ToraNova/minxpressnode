#!/bin/bash

# curl script to create admin
curl -v -H "Content-Type: application/json" --data-binary '{"email":"chia_jason96@live.com","password":"test123"}' http://localhost:1996/user/login | awk '/tokens/{print $1}' | jq -r '.token' > token
