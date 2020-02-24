#!/bin/bash

# use this to easily launch mongodb scripts

if [ -z "$1" ]; then
	echo "Please specify mongodb script (setupadmin.js etc.)"
	exit 1
fi

mongoadmin="cjason"
host="cj-dbserv"
port="27017"
tls=1
tlsCAFile="/home/cjason/cj-authority.crt"

if [ $tls -eq 1 ];then
	# tls
	mongo --host $host --port $port --tls --tlsCAFile $tlsCAFile -u $mongoadmin $1

else
	# non tls
	mongo --host $host --port $port -u $mongoadmin $1
fi

exit 0

