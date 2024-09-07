#!/bin/bash

mkdir -p markdown-mmd;

for source_file in $(find org-mode -type f -name "*.org");
do
    # Create directories
    source_dir=$(dirname $source_file)
    dest_dir=$(echo $source_dir | sed 's/org-mode/markdown-mmd/g')
    mkdir -p $dest_dir

    # Export files from org-mode to markdown
    file_name=$(basename $source_file)
    dest_file="$dest_dir/${file_name%.org}.md"
    echo "Exporting $source_file to $dest_file"
    pandoc -s "$source_file" -o "$dest_file" -t markdown_mmd+yaml_metadata_block
done