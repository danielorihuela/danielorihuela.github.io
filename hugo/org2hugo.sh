#!/bin/bash

export HUGO_BASE_DIR=`pwd`
export POSTS_ORG_SRC=`pwd`/org-content/posts
export ABOUT_ORG_SRC=`pwd`/org-content/about
export OPEN_SOURCE_ORG_SRC=`pwd`/org-content/open-source
HOME=/tmp/emacs-build

mkdir -p $HOME
cp -r `pwd`/init.el $HOME

emacs -Q --batch --load $HOME/init.el --execute "(build/export-all)" --kill
