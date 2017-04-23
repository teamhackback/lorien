import pymongo
import json
import paypalrestsdk
from os import environ
from flask import Flask, request, abort, redirect
from werkzeug import Response
from db import orders
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


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

    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/order/thanks/",
            "cancel_url": "http://localhost:3000/"
        },
        "transactions": [
            {
                "item_list": {"items": [
                        # {
                            # "name": "Kiwi Tree",
                            # "sku": "Kiwi Tree",
                            # "price": "13.00",
                            # "currency": "EUR",
                            # "quantity": 1
                        # },
                ]},
                "amount": {
                    # "total": "13.00",
                    "currency": "EUR"
                },
                "description": "Payment to Lorien"
            }]
    })

    payment['transactions']['amount']['total'] = 0

    # add items
    if order.beehive.size is not None:
        price = 10 if 'Small' in order.beehive.size else 20 if 'Medium' in order.beehive.size else 40
        payment['transactions']['amount']['total'] += price
        payment['transactions']['item_list']['items'].append({
            "name": order.beehive.size,
            "sku": order.beehive.size,
            "price": price,
            "currency": "EUR",
            "quantity": 1
        })

    if order.carbon.nrOfTrees is not None:
        payment['transactions']['item_list']['items'].append({
            "name": "CO2 Offset",
            "sku": "CO2 Offset",
            "price": order.carbon.nrOfTrees * 10,  # default flat-rate factor
            "currency": "EUR",
            "quantity": 1
        })

    if order.carbon.tree is not None:
        payment['transactions']['item_list']['items'].append({
            "name": order.carbon.tree + " Offset",
            "sku": order.carbon.tree + " Offset",
            "price": 50, # default flat-rate factor
            "currency": "EUR",
            "quantity": 1
        })
        
    items = [
        {
          'title': "The drone gardener",
          'price': 200
        },
        {
          'title': 'Apiary',
          'price': 15
        },
        {
          'title': 'Satellite observation',
          'price': 200
        },
        {
          'title': "Premium support",
          'price': 200
        }
    ]

    for ps in order.premiumService:
        for i in items:
            if i['title'] == ps['title']:
                payment['transactions']['item_list']['items'].append({
                    "name": i['title'],
                    "sku": i['title'],
                    "price": i['price'],
                    "currency": "EUR",
                    "quantity": 1
                })

    payment['transactions']['amount']['total'] = order.total

    print(payment)

    if payment.create():
        print("Payment[%s] created successfully" % (payment.id))
        order['payment_id'] = payment.id
        new_order = orders.insert_one(order)
        for link in payment.links:
            if link.method == "REDIRECT":
                return redirect(str(link.href) + new_order.id)
    else:
        print("Error while creating payment")
        print(payment.error)


if __name__ == '__main__':
    port = environ.get("PORT", "8001")
    app.run(debug=True, port=int(port), use_reloader=True)
