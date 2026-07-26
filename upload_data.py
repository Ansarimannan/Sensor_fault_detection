from pymongo.mongo_client import MongoClient
import pandas as pd
import json


#url 
url="mongodb+srv://Mannan:12345@cluster0.t6vveqt.mongodb.net/?appName=Cluster0"

#create a new client and connect to server 
client=MongoClient(url)

#create a database name and collection name 
DATABASE_NAME="pwskills"
COLLECTION_NAME="waferfault"

df=pd.read_csv("C:\Users\mohdm\Desktop\Sensor Fault Detection\notebooks\wafer_23012020_041211.csv")

df.drop("Unnamed: 0",axis=1)

json_record=list(json.loads(df.T.to_json()).values())

client[DATABASE_NAME][COLLECTION_NAME].insert_many(json_record)

