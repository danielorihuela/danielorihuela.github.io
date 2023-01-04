let fs = {
    'posts': {
        'first post': 'text of first post',
        'hidden': {
            'a': 'b'
        }
    },
    'otra': {
        'a': 'b'
    }
};

let path = [];
let cwd = fs;

function is_dir(obj) {
    return typeof obj === 'object';
}

function is_file(obj) {
    return typeof obj === 'string';
}

export const commands = {
    cd: function (directory) {
        if (directory == null) {
            this.error('Wrong number of arguments. Function \'cd\' expects 1 got 0.');
            return;
        }
        if (directory != null && directory[0] === '/') {
            this.error($.terminal.escape_brackets(directory) + ' is not a directory');
            return;
        }

        if (directory !== '~' && directory !== '~/' && directory !== '..' && !is_dir(fs[directory.replace(/[~/]/g, '')])) {
            this.error($.terminal.escape_brackets(directory) + ' is not a directory');
            return;
        }

        this.pause();
        if (directory === '~' || directory === '~/' || directory === '..') {
            path = [];
            cwd = fs;
        } else {
            let p = directory.split('/').filter(Boolean).filter(c => c !== '~');
            if (directory[0] !== '~' && directory[1] !== '/') {
                p = path.concat(p);
            }
            cwd = fs[p[0]];
            path = p;
        }
        this.resume();
    },
    ls: function (directory) {
        let directory_content = cwd;
        if (directory != null) {
            const clean_directory_name = directory.replace(/[~/]/g, '');
            directory_content = fs[clean_directory_name];

            if (directory === "~" || directory === "~/") {
                directory_content = fs;
            }
        }
        if (!directory_content || directory != null && directory[0] === '/') {
            this.error($.terminal.escape_brackets(directory) + ' is not a directory');
            return;
        }

        const directory_content_names = Object.keys(directory_content).map(function (key) {
            if (is_dir(directory_content[key])) {
                return key + '/';
            }
            return key;
        });
        this.echo(directory_content_names.join('\n'));
    },
    cat: function (file) {
        if (!is_file(cwd[file])) {
            this.error($.terminal.escape_brackets(file) + " don't exists");
        } else {
            this.echo(cwd[file]);
        }
    },
    help: function () {
        this.echo('Available commands: ' + Object.keys(commands).join(', '));
    }
};

export function prompt(callback) {
    const prompt = 'root@daniel:~' + (path.length > 0 ? '/' + path.join('/') : path.join('/')) + '$ ';
    $('.title').html(prompt);
    callback(prompt);
}

export function completion(string, callback) {
    const command = $.terminal.parse_command(this.get_command());

    function dirs(cwd) {
        return Object.keys(cwd).filter(function (key) {
            return is_dir(cwd[key]);
        }).map(function (dir) {
            return dir + '/';
        });
    }

    if (command.name === 'ls' || command.name === 'cd') {
        let p = string.split('/').filter(Boolean);
        if (p.length === 0) {
            return callback([]);
        }

        if (string[0] === '~' && string[1] === '/') {
            return callback(dirs(fs).map(function (dir) {
                return '~/' + dir;
            }));
        }

        if (p.length === 1) {
            callback(dirs(cwd));
        } else {
            p = path.concat(p);
            if (string[string.length - 1] !== '/') {
                p.pop();
            }
            const prefix = string.replace(/\/[^/]*$/, '');
            callback(dirs(fs[p[0]]).map(function (dir) {
                return prefix + '/' + dir;
            }));
        }
    } else if (command.name === 'cat') {
        const files = Object.keys(cwd).filter(function (key) {
            return is_file(cwd[key]);
        });
        callback(files);
    } else {
        callback(Object.keys(commands));
    }
}