rm -rf uaect.tar.gz

echo "Deleted the existing tar ball"

npm run devserver
STATUS=$?

echo "npm run build status $STATUS"

if [ $STATUS -gt 0 ]; then
	echo "npm run build failed with status $STATUS skipping tar ball bundle."
	exit $STATUS
fi

cd dist
tar -czf  ../uaect.tar.gz .
cd ../
echo "Successfully created tar ball uaect.tar.gz"

echo "Deploying uaect-dev to dev server"
scp -i ~/Dropbox/SSH/BusinessID/private_openssh.pem uaect.tar.gz pradeep@35.222.146.182:/var/www/html/dev.businessid.net
rm -r dist
rm uaect.tar.gz
ssh -i ~/Dropbox/SSH/BusinessID/private_openssh.pem pradeep@35.222.146.182 /var/www/html/dev.businessid.net/run.sh
