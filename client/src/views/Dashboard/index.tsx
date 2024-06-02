import SignupsOverview from "./SignupsOverview";
import TargetVisualization from "./TargetVisualization";
import TopCardMetrics from "./TopCardMetrics";
import UpcomingInvoices from "./UpcomingInvoices";

const Dashboard = () => {
  
  return (
    <>
      <TopCardMetrics />
      <TargetVisualization />
      <SignupsOverview />
      <UpcomingInvoices />
    </>

  );
};

export default Dashboard;
