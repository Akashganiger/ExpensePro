import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import ApprovalQueue from "../pages/ApprovalQueue";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/common/ProtectedRoute";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/employee"
                element={
                    <ProtectedRoute role="employee">
                        <EmployeeDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager"
                element={
                    <ProtectedRoute role="manager">
                        <ManagerDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/manager/approvals"
                element={
                    <ProtectedRoute role="manager">
                        <ApprovalQueue />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}