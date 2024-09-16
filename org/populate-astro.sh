#!/bin/bash

source org2md.sh;
rm -rf ../src/content/blog/*;
cp -r markdown-mmd/* ../src/content/blog;

cp -r images/* ../src/images ;
