import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {

        setLoading(true);

        try {

            const data = await authService.login(email, password);

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify({

                name: data.name,
                role: data.role

            }));

            setUser({

                name: data.name,
                role: data.role

            });

            if (data.role === "employee")
                navigate("/employee");

            else
                navigate("/manager");

        }

        catch (err) {

            throw err;

        }

        finally {

            setLoading(false);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        navigate("/");

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};