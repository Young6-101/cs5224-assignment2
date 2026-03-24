from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count

spark = SparkSession.builder.appName("TwitterStats").getOrCreate()

INPUT_PATH = "s3a://assignment2-twitter-combined/twitter_combined.txt"
OUTPUT_PATH = "s3a://assignment2-twitter-combined/results/user_stats/"


df = spark.read.option("delimiter", " ").csv(INPUT_PATH)
df = df.toDF("follower", "followee")

followers = df.groupBy("followee") \
    .agg(count("follower").alias("followers")) \
    .withColumnRenamed("followee", "user_id")


followees = df.groupBy("follower") \
    .agg(count("followee").alias("followees")) \
    .withColumnRenamed("follower", "user_id")


result = followers.join(followees, "user_id", "full_outer").fillna(0)

result.write.csv("s3a://assignment2-twitter-combined/results/user_stats/", header=True)

spark.stop()

