from os import environ
from flask import Flask

app = Flask(__name__)


@app.route('/api/hello')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    port = environ.get("PORT", "8001")
    app.run(debug=True, port=int(port), use_reloader=True)
