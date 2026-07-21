import DashboardLayout from "../layouts/DashboardLayout";
import ApprovalTable from "../components/manager/ApprovalTable";

export default function ApprovalQueue() {

    return (

        <DashboardLayout title="Approval Queue">

            <ApprovalTable />

        </DashboardLayout>

    );

}