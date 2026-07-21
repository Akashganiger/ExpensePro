from flask import Flask
from flask_cors import CORS

from config import Config
from database import mysql

from routes.auth_routes import auth_bp
from routes.expense_routes import expense_bp
from routes.manager_routes import manager_bp
from routes.budget_routes import budget_bp

app = Flask(__name__)

app.config.from_object(Config)

mysql.init_app(app)

CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True
)

app.register_blueprint(auth_bp, url_prefix="/api/v1")
app.register_blueprint(expense_bp, url_prefix="/api/v1")
app.register_blueprint(manager_bp, url_prefix="/api/v1")
app.register_blueprint(budget_bp, url_prefix="/api/v1")


@app.route("/")
def home():
    return {
        "message": "ExpensePro Backend Running"
    }


if __name__ == "__main__":

    print(app.url_map)

    app.run(debug=True)