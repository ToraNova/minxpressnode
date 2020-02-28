#!/bin/bash

# curl script to unauthenticate (logout)
[ ! -f 'token' ] && echo 'Please get token from login first!' && exit 1
authtoken=$(cat token)

rc=$(curl -v -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${authtoken}" http://localhost:1996/user/logout | jq -r '.res')
if [ $rc = success ]; then
	echo logout successful
	rm token
	exit 0
else
	echo failed to logout
	exit 1
fi
