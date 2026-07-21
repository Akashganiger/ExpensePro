from database import mysql


class UserModel:

    @staticmethod
    def get_by_email(email):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT
                id,
                email,
                password_hash,
                full_name,
                department,
                role,
                session_token
            FROM users
            WHERE email=%s
        """, (email,))

        user = cursor.fetchone()
        cursor.close()

        return user

    @staticmethod
    def get_by_id(user_id):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT
                id,
                email,
                full_name,
                department,
                role
            FROM users
            WHERE id=%s
        """, (user_id,))

        user = cursor.fetchone()
        cursor.close()

        return user

    @staticmethod
    def update_session_token(user_id, token):
        cursor = mysql.connection.cursor()

        cursor.execute("""
            UPDATE users
            SET session_token=%s
            WHERE id=%s
        """, (token, user_id))

        mysql.connection.commit()
        cursor.close()