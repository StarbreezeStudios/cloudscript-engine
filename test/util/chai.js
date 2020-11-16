'use strict';

const chai = require('chai');
const {eachItem} = require('./chaiExtensions');
const chaiShallowDeepEqual = require('chai-shallow-deep-equal');
chai.use(chaiShallowDeepEqual);
chai.use(eachItem);

module.exports = chai;
