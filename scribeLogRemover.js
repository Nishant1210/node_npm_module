let rimraf = require('rimraf');
let fs = require("fs");
let df = require("df");

let logPath = ''; //Log file path

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function deleteFiles(path) {
    fs.readdir(path, function(err, files) {
        if (err) {
            return console.log(err);
        }

        files = files.sort(); // Just to be sure that it is sorted as the docs do not mention anything about sorted order

        for (var i = 0; i < files.length - 4; i++) {
            fs.unlink(path + '/' + files[i]);
            console.log('Deleted files : ' + path + '/' + files[i]);
        }
    });
};

function deleteFolder(path) {
    rimraf(path, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Deleted folder : ' + path);
    });
};

df(function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(result);

    // result[0].filesystem === '/dev/xvda1' && 
    // You may need to verify the filesystem as well on Linux

    if (result[0].percent > 80) {
        if (fs.existsSync(logPath + currentYear + '/')) {
            for (var i = 0; i < months.length; i++) {
                if (i < currentMonth && fs.existsSync(logPath + currentYear + '/' + months[i])) {
                    deleteFolder(logPath + currentYear + '/' + months[i]);
                } else if (i === currentMonth && fs.existsSync(logPath + currentYear + '/' + months[i])) {
                    deleteFiles(logPath + currentYear + '/' + months[i]);
                }
            }
        }
    }
});
