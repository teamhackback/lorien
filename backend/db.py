from pymongo import MongoClient

mongo_client = MongoClient()
lorien = mongo_client['lorien']

orders = lorien['orders']
