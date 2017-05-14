'use strict';

module.exports = function (benchmarkName, nativeES2015, lightWeight, bluebird) {
    new require('benchmark').Suite(`Benchmarking ${benchmarkName}`)
        .add('Native ES2015', nativeES2015)
        .add('Light Weight ', lightWeight)
        .add('BlueBird     ', bluebird)
        .on('start', (evt) => console.log(`${evt.currentTarget.name}...`))
        .on('cycle', (evt) => console.log(String(evt.target)))
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        })
        .run({
            'async': true
        });
};
