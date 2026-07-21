import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

export default function DashboardLayout({ children, title }) {

    return (

        <div className="layout">

            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <main className="dashboard-content">

                    <h1 className="page-title">

                        {title}

                    </h1>

                    {children}

                </main>

            </div>

        </div>

    );

}