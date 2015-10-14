
var chai = require('chai');
var expect = require('chai').expect;
var myfunction = require('../app/myfunction');
var server = require('../app/server');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var fs = require('fs');
chai.use(sinonChai);

var redis = require('redis');
var client = redis.createClient();

console.log('Running');


describe('Increments the number stored at count by query',function(){
	before(function(done){

		setTimeout(function(){
			client.set('count', 5);
     

      // complete the async beforeEach
      done();

    }, 50);

		

	});
	it('return incerement count in database redis', function(done){
		var inputData = {id:"126",name:"radim",count:"5"};
		var outputData = 10;
		
		myfunction.incrIfParamHasCount(inputData, function(reply){
			expect(reply).to.equal(outputData);
			done();	
		});
		
	});

})

describe('Save data to file as Json', function(){
	beforeEach(function(done){
	
			setTimeout(function(){
				fs.truncate('./test/test.json', 0, function(){console.log('done')});

      // complete the async beforeEach
      done();

    }, 50);
	})

	it('return if query is save as json in file',function(done){
		var inputData = {id:"126",name:"radim",count:"5"};
		var array = [];
		array.push(inputData);
		var outputData = JSON.stringify(array,null,4);
		

		myfunction.appendJsonTofile('./test/test.json',inputData,function(reply){
			expect(reply).to.equal(outputData);
			done();
		})


	})

})




