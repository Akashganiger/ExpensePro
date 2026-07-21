from flask import Blueprint, request, jsonify
from database import mysql
import jwt
import datetime
from config import Config

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "success": False,
            "message": "Email and Password are required"
        }), 400

    cursor = mysql.connection.cursor()

    cursor.execute("""
        SELECT id,email,password_hash,full_name,department,role
        FROM users
        WHERE email=%s
    """, (email,))

    user = cursor.fetchone()

    if not user:
        return jsonify({
            "success": False,
            "message": "Invalid Credentials"
        }), 401

    # For now (replace with bcrypt later)
    if password != user[2]:
        return jsonify({
            "success": False,
            "message": "Invalid Credentials"
        }), 401

    token = jwt.encode(
        {
            "id": user[0],
            "email": user[1],
            "department": user[4],
            "role": user[5],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        },
        Config.SECRET_KEY,
        algorithm="HS256"
    )

    cursor.execute(
        "UPDATE users SET session_token=%s WHERE id=%s",
        (token, user[0])
    )

    mysql.connection.commit()

    cursor.close()

    return jsonify({
        "success": True,
        "token": token,
        "role": user[5],
        "name": user[3]
    })