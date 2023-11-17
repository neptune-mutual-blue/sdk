# chmod u+x fixup.sh
echo "Fixing build files..."

cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs"
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module"
}
!EOF

filesToEdit=$(grep -l -r --include "*.js" "json\'" ./dist/mjs)

echo "$filesToEdit"

grep -l -r --include "*.js" "json\'" ./dist/mjs | xargs sed -i.bak "s/.json';/.json' assert { type: 'json' };/g";

echo "Fixing completed!"