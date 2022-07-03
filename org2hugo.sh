#!/bin/bash

export HUGO_BASE_DIR=`pwd`
export POSTS_ORG_SRC=`pwd`/posts
HOME=/tmp/emacs-build

mkdir -p $HOME
cp -r `pwd`/init.el $HOME

emacs -Q --batch --load $HOME/init.el --execute "(build/export-all)" --kill
