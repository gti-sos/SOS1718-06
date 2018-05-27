#!/bin/bash

case $1 in
    heroku)
    npm test -- --params.host=sos1718-06.herokuapp.com --params.host=80
    ;;
    *)
    npm test
    ;;
esac