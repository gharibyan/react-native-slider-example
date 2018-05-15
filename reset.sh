watchman watch-del-all
rm -fr $TMPDIR/react-*
rm -rf node_modules/ && yarn cache clean && npm install
