'use strict';

const scan = require('./shared/scan'),
    fs = require('fs-extra'),
    errors = [],
    check = function (file) {
        const contents = fs.readFileSync(file, 'utf8');
        if (contents.indexOf("=== 'object'") > 0) {
            errors.push(`${file} appears to do a typecheck against object without using helpers.isObject`);
        }
    },
    exclusions = ['node_modules', 'functionalTest', 'objectCheck.js', 'helpers.js', 'staticAnalysis.js'];

scan.forEachFileIn('.', check, { exclude: exclusions, filetype: '.js' });

errors.forEach(err => console.error(err));
process.exit(errors.length); // eslint-disable-line no-process-exit
