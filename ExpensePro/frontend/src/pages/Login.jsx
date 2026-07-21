import { useState } from "react";

import useAuth from "../hooks/useAuth";

export default function Login() {

    const { login, loading } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await login(email, password);

        }

        catch {

            setError("Invalid email or password");

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#f5f5f5"
            }}
        >

            <form

                onSubmit={handleSubmit}

                style={{

                    width: 350,

                    background: "white",

                    padding: 30,

                    borderRadius: 10,

                    boxShadow: "0 0 10px rgba(0,0,0,.2)"

                }}

            >

                <h2>ExpensePro Login</h2>

                <br />

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e) => setEmail(e.target.value)}

                    style={{

                        width: "100%",

                        padding: 10,

                        marginBottom: 15

                    }}

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                    style={{

                        width: "100%",

                        padding: 10,

                        marginBottom: 15

                    }}

                />

                {

                    error &&

                    <p style={{ color: "red" }}>

                        {error}

                    </p>

                }

                <button

                    style={{

                        width: "100%",

                        padding: 10

                    }}

                >

                    {

                        loading

                            ? "Logging in..."

                            : "Login"

                    }

                </button>

            </form>

        </div>

    );

}