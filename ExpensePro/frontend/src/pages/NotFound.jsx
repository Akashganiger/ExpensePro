import { Link } from "react-router-dom";

export default function NotFound() {

    return (

        <div className="not-found-container">

            <h1 className="not-found-title">

                404

            </h1>

            <h2>

                Page Not Found

            </h2>

            <p>

                Sorry, the page you're looking for doesn't exist.

            </p>

            <Link

                to="/"

                className="home-btn"

            >

                Go Back Home

            </Link>

        </div>

    );

}