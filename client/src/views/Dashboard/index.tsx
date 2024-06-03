import { Container } from "@mui/material";
import SignupsOverview from "./SignupsOverview";
import TargetVisualization from "./TargetVisualization";
import TopCardMetrics from "./TopCardMetrics";
import UpcomingInvoices from "./UpcomingInvoices";

const Dashboard = () => {
  return (
    <Container maxWidth={"lg"} >
      <TopCardMetrics />
      <TargetVisualization />
      <SignupsOverview />
      <UpcomingInvoices />
    </Container>

  );
};

export default Dashboard;
