
var request = require("request");
var qs = require("querystring");
var uuid = require("uuid");
var should = require("should");
var sinon = require("sinon");
var url = require("url");

var ua = require("../lib/index.js");
var utils = require("../lib/utils.js")
var config = require("../lib/config.js")


describe("ua", function () {


	describe("#plugin", function () {

		it("should be able to overwrite sendHitTask", function () {
            var visitor = ua()
            var customSendHitTask = sinon.spy();
            visitor.set('sendHitTask', customSendHitTask);

            var result = visitor.pageview('/').send();
            customSendHitTask.calledOnce.should.equal(true, "#customSendHitTask should have been called once");

		});

		it("should receive request data", function (done) {
		    var page = 'a-little-test';
            var visitor = ua()
            var originalSendHitTask = visitor.get('sendHitTask');
            var customSendHitTask = function(path, options, cb) {
                options.body.should.containEql(page);
                done();
            }

            visitor.set('sendHitTask', customSendHitTask);

            visitor.pageview(page).send();
		});

	});

});










