#!/bin/bash

# use this to easily launch mongodb scripts

if [ -z "$1" ]; then
	echo "Please specify mongodb script (setupadmin.js etc.)"
	exit 1
fi

mongoadmin="mxn-admin"
host="cj-dbserv"
port="27017"
tls=1
tlsCAFile="/home/cjason/cj-authority.crt"
dbname="minxpressnode"

if [ $tls -eq 1 ];then
	# tls
	mongo --host $host --port $port --tls --tlsCAFile $tlsCAFile -u $mongoadmin $dbname $1

else
	# non tls
	mongo --host $host --port $port -u $mongoadmin $dbname $1
fi

exit 0

