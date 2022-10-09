rm -rf uaect.tar.gz

echo "Deleted the existing tar ball"

npm run build
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
scp uaect.tar.gz abdulihshan@35.222.146.182:/var/www/html
rm -r dist
rm uaect.tar.gz
ssh abdulihshan@35.222.146.182 /var/www/html/run.sh