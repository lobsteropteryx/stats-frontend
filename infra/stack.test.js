"use strict";
exports.__esModule = true;
var cdk = require("aws-cdk-lib");
var assertions_1 = require("aws-cdk-lib/assertions");
var Stack = require("./stack");
var template;
beforeAll(function () {
    var app = new cdk.App();
    var stack = new Stack.StatsFrontendStack(app, 'StatsFrontendStack');
    template = assertions_1.Template.fromStack(stack);
});
test('Bucket Created', function () {
    template.hasResourceProperties("AWS::S3::Bucket", {});
});
test('Bucket Deploymenet Created', function () {
    template.hasResourceProperties("AWS::S3Deployment::BucketDeployment", {});
});
test('Stats endpoint created', function () {
    template.hasResourceProperties("AWS::ApiGateway::Resource", {
        PathPart: "stats"
    });
});
