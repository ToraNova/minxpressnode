#!/bin/bash

# Test file upload
# upload a file
[ ! -f 'token' ] && echo 'Please get token from login first!' && exit 1
authtoken=$(cat token)

curl -v -X POST -H "Content-Type: multipart/form-data" -H "Authorization: Bearer ${authtoken}" -F "file=@imlogo.png" http://localhost:1996/file/upload
