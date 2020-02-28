#!/bin/bash

# Test authorization GET
# obtain a protected resource from the backend

authtoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEzMDQ1NDNmNzMzNjMwYjI3ZjAzOTQiLCJpYXQiOjE1NzA5NjUxNzEsImV4cCI6MTU3MDk2ODc3MX0.Qx9XdAv3cA0q2tnNhdfLRy-Vye0p2yIsP_D-sALf44w"
curl -i -X GET -H "Content-Type: application/json" -H "Authorization: Bearer ${authtoken}" http://localhost:1996/user/profile -v
