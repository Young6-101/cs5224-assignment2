import boto3
import pandas as pd
import io
from ..config import Config

class S3Service:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
            region_name=Config.AWS_REGION
        )
        self.bucket = Config.S3_BUCKET
        self.results_key = Config.S3_RESULTS_KEY
    
    def get_user_stats(self):
        try:
            resp = self.s3_client.list_objects_v2(
                Bucket=self.bucket,
                Prefix=self.results_key
            )

            part_keys = [o["Key"] for o in contents if o["Key"].split("/")[-1].startswith("part-")]

            if not part_keys:
                return []

            obj = self.s3_client.get_object(
                Bucket=self.bucket,
                Key=part_keys[0]
            )

            df = pd.read_csv(io.BytesIO(obj['Body'].read()))

            df = df.fillna(0)
            df['user_id'] = df['user_id'].astype(int)
            df['followers'] = df['followers'].astype(int)
            df['followees'] = df['followees'].astype(int)
            
            return df.to_dict(orient='records') 
        
        except Exception as e:
            print(f"Error reading from S3: {e}")
            return []