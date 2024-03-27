require 'aws-sdk-s3'

Aws.config.update(
  access_key_id: ENV["AWS_S3_KEY"],
  secret_access_key: ENV["AWS_S3_SECRET"],
  region: ENV["AWS_S3_REGION"] || "eu-west-1"
)
