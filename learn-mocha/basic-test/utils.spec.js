const utils = require('./utils');
const should = require('should');

describe('utils.js모듈의 capitialize() 함수는', ()=>{
    it('문자열의 첫번째 문자를 대문자로 반환한다.', ()=>{
        // test code...
        const result = utils.capitialize('hello');
        result.should.be.equal('Hello');
    });
});