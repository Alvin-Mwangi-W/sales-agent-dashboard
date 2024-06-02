import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import MetricCard from "../../components/MetricCard";
import axios from "axios";

const TopCardMetrics = () => {
    const [metrics, setMetrics] = useState({
        collections: 0,
        signups: { total: 0, breakdown: { Analytics: 0, Finance: 0, Timetable: 0 } },
        revenue: { total: 0, breakdown: { Analytics: 0, Finance: 0, Timetable: 0 } },
        bouncedCheques: 0,
      });
    
      useEffect(() => {
        // Fetching data from the JSON server
        axios.get("http://localhost:3000/metrics")
          .then((response) => {
            setMetrics(response.data);
          })
          .catch((error) => {
            console.error("Error fetching metrics data:", error);
          });
      }, []);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard title="Collections" value={metrics.collections} breakdown={undefined} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Sign-ups"
            value={metrics.signups.total}
            breakdown={metrics.signups.breakdown}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Total Revenue"
            value={metrics.revenue.total}
            breakdown={metrics.revenue.breakdown}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard title="Bounced Cheques" value={metrics.bouncedCheques} breakdown={undefined} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default TopCardMetrics