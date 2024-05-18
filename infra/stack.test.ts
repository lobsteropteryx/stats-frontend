import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as Stack from './stack';

let template:cdk.assertions.Template;

beforeAll(() => {
    const app = new cdk.App();
    const stack = new Stack.StatsFrontendStack(app, 'StatsFrontendStack');
    template = Template.fromStack(stack);
});

test('Bucket Created', () => {
  template.hasResourceProperties("AWS::S3::Bucket", {});
});

test('Bucket Deploymenet Created', () => {
  template.hasResourceProperties("AWS::S3Deployment::BucketDeployment", {});
});

test('Stats endpoint created', () => {
  template.hasResourceProperties("AWS::ApiGateway::Resource", {
    PathPart: "stats"
  });
});