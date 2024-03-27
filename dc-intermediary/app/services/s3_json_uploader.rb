require 'aws-sdk-s3'

class S3JsonUploader
  def initialize(bucket_name)
    @bucket_name = bucket_name
    @s3_client = Aws::S3::Client.new
  end

  def upload(json_object, object_key)
    s3_resource = Aws::S3::Resource.new(client: @s3_client)
    bucket = s3_resource.bucket(@bucket_name)
    obj = bucket.object(object_key)

    obj.put(body: json_object.to_json, content_type: 'application/json')
  end
  
  def download(object_key)
    s3_resource = Aws::S3::Resource.new(client: @s3_client)
    bucket = s3_resource.bucket(@bucket_name)
    obj = bucket.object(object_key)

    json_content = obj.get.body.read
    JSON.parse(json_content)
  end  
end
