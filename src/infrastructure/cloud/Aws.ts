import AWS from 'aws-sdk';

AWS.config.region = process.env.AWS_REGION || 'us-east-1';
AWS.config.credentials = new AWS.SharedIniFileCredentials({
  profile: process.env.AWS_PROFILE,
});

export { AWS };
