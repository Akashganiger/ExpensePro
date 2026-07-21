import jwt
import bcrypt
import datetime

from config import Config
from models.user_model import UserModel


class AuthService:

    @staticmethod
    def login(email, password):

        user = UserModel.get_by_email(email)

        if not user:
            return None

        # user tuple:
        # id,email,password_hash,full_name,department,role,session_token

        stored_password = user[2]

        # If using bcrypt
        try:
            if not bcrypt.checkpw(
                password.encode(),
                stored_password.encode()
            ):
                return None
        except:
            # For plain text passwords (development only)
            if password != stored_password:
                return None

        token = jwt.encode({

            "id": user[0],
            "email": user[1],
            "department": user[4],
            "role": user[5],
            "exp": datetime.datetime.utcnow() +
                   datetime.timedelta(hours=6)

        },
            Config.SECRET_KEY,
            algorithm="HS256"
        )

        UserModel.update_session_token(user[0], token)

        return {

            "token": token,
            "name": user[3],
            "role": user[5],
            "department": user[4]

        }