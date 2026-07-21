import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {

    const { user } = useAuth();

    return (

        <aside className="sidebar">

            <h2>

                ExpensePro

            </h2>

            <nav>

                {

                    user.role === "employee"

                    ?

                    <>

                        <NavLink to="/employee">

                            Dashboard

                        </NavLink>

                    </>

                    :

                    <>

                        <NavLink to="/manager">

                            Dashboard

                        </NavLink>

                        <NavLink to="/manager/approvals">

                            Approval Queue

                        </NavLink>

                    </>

                }

            </nav>

        </aside>

    );

}