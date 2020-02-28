#!/bin/bash

# Test authorization GET
# obtain a protected resource from the backend

[ ! -f 'token' ] && echo 'Please get token from login first!' && exit 1
authtoken=$(cat token)

curl -v -H "Content-Type: application/json" -H "Authorization: Bearer ${authtoken}" http://localhost:1996/user/profile
exit 0
