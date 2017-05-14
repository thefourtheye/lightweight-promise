'use strict';

const LightWeightPromise = require('../index');
const BlueBird = require('bluebird');


function Native() {
    new Promise(() => {});
}


function LightWeight() {
    LightWeightPromise.createPromise();
}


function Bluebird() {
    new BlueBird(() => {});
}


require('./suite')('Promise Creation', Native, LightWeight, Bluebird);
