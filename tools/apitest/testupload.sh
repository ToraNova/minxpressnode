#!/bin/bash

# Test file upload
# upload a file (using unauthorized path)

curl -i -X POST -H "Content-Type: multipart/form-data" -H "Authorization: Bearer ${authtoken}" -F "file=@logo.png" http://localhost:1996/file/upload -v
