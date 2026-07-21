import useAuth from "../../hooks/useAuth";

export default function Navbar() {

    const { user, logout } = useAuth();

    const displayName =
        user?.full_name ||
        user?.name ||
        user?.email ||
        "User";

    return (

        <header className="navbar">

            <div className="navbar-logo">

                <h1>ExpensePro</h1>

            </div>

            <div className="navbar-right">

                <div className="user-info">

                    <span className="welcome-text">

                        Welcome,

                    </span>

                    <span className="user-name">

                        {displayName}

                    </span>

                </div>

                <button

                    className="logout-btn"

                    onClick={logout}

                >

                    Logout

                </button>

            </div>

        </header>

    );

}