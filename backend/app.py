import pymongo
import json
from os import environ
from flask import Flask, request, abort
from werkzeug import Response
from db import orders
from bson.json_util import dumps

app = Flask(__name__)


@app.route('/api/hello')
def hello():
    return 'Hello, World!'


@app.route('/api/orders', methods=['GET'])
def get_all_orders():
    last_ten_orders = \
            orders.find().sort('created_on', pymongo.DESCENDING).limit(20)
    return Response(
            dumps(list(last_ten_orders)),
            mimetype='application/json'
            )


@app.route('/api/order/<order_id>')
def get_order(order_id):
    order = orders.find_one({'_id': int(order_id)})
    if order is None:
        abort(404, "Order not found.")
    return Response(
            dumps(order),
            mimetype='application/json'
            )


@app.route('/api/order', methods=['POST'])
def put_order():
    order = request.get_json()
    orders.insert_one(order)

    return ('', 204)


if __name__ == '__main__':
    port = environ.get("PORT", "8001")
    app.run(debug=True, port=int(port), use_reloader=True)
