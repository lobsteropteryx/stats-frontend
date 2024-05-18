"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.StatsFrontendStack = void 0;
var path = require("path");
var cdk = require("aws-cdk-lib");
var aws_s3_1 = require("aws-cdk-lib/aws-s3");
var aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
var aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
var aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
var StatsFrontendStack = /** @class */ (function (_super) {
    __extends(StatsFrontendStack, _super);
    function StatsFrontendStack(scope, id, props) {
        var _this = _super.call(this, scope, id, props) || this;
        var bucket = new aws_s3_1.Bucket(_this, 'Bucket', {
            accessControl: aws_s3_1.BucketAccessControl.PRIVATE
        });
        new aws_s3_deployment_1.BucketDeployment(_this, 'BucketDeployment', {
            destinationBucket: bucket,
            sources: [aws_s3_deployment_1.Source.asset(path.resolve(__dirname, './dist'))]
        });
        var originAccessIdentity = new aws_cloudfront_1.OriginAccessIdentity(_this, 'OriginAccessIdentity');
        bucket.grantRead(originAccessIdentity);
        new aws_cloudfront_1.Distribution(_this, 'Distribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new aws_cloudfront_origins_1.S3Origin(bucket, { originAccessIdentity: originAccessIdentity })
            }
        });
        return _this;
    }
    return StatsFrontendStack;
}(cdk.Stack));
exports.StatsFrontendStack = StatsFrontendStack;
