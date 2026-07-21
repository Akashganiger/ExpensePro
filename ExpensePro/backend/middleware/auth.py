import jwt
from functools import wraps
from flask import request, jsonify
from config import Config


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return jsonify({
                "success": False,
                "message": "Authorization token is missing"
            }), 401

        try:
            # Remove "Bearer " if present
            if token.startswith("Bearer "):
                token = token.split(" ")[1]

            data = jwt.decode(
                token,
                Config.SECRET_KEY,
                algorithms=["HS256"]
            )

            request.user = data

        except jwt.ExpiredSignatureError:
            return jsonify({
                "success": False,
                "message": "Token has expired"
            }), 401

        except jwt.InvalidTokenError:
            return jsonify({
                "success": False,
                "message": "Invalid token"
            }), 401

        return f(*args, **kwargs)

    return decorated


def employee_required(f):
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):

        if request.user["role"] != "employee":
            return jsonify({
                "success": False,
                "message": "Employee access required"
            }), 403

        return f(*args, **kwargs)

    return decorated


def manager_required(f):
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):

        if request.user["role"] != "manager":
            return jsonify({
                "success": False,
                "message": "Manager access required"
            }), 403

        return f(*args, **kwargs)

    return decorated