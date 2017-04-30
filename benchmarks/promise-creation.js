'use strict';

const LightWeightPromise = require('../index');
const BlueBird = require('bluebird');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('Benchmarking Promise Creation');


suite
  .add('Native ES2015', TestPromise)
  .add('Light Weight ', TestLightWeightPromise)
  .add('BlueBird     ', TestBlueBirdPromise)
  .on('start', (evt) => console.log(`${evt.currentTarget.name}...`))
  .on('cycle', (evt) => console.log(String(evt.target)))
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });


function TestPromise() {
  new Promise(() => {});
}


function TestLightWeightPromise() {
  LightWeightPromise.createPromise();
}


function TestBlueBirdPromise() {
  new BlueBird(() => {});
}
