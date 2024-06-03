/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { useGetMetricsQuery } from "../../state/api";

const TopCardMetrics = () => {
  const theme = useTheme();
  const { data: metrics, isLoading, isError } = useGetMetricsQuery();

  if (isLoading) return <Typography variant="h6">Loading metrics...</Typography>;
  if (isError) return <Typography variant="h6">Error fetching metrics</Typography>;

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.grey[900] }}>
            <CardContent>
              <Typography style={{color: theme.palette.grey[900]}}  variant="h5">Collections</Typography>
              {/* @ts-expect-error */}
              <Typography variant="h6">{metrics.collections}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.grey[900] }}>
            <CardContent>
              <Typography style={{color: theme.palette.grey[900]}}  variant="h5">Sign-ups</Typography>
              {/* @ts-expect-error */}
              <Typography variant="h6">{metrics.signups.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: theme.palette.info.main, color: theme.palette.grey[900] }}>
            <CardContent>
              <Typography style={{color: theme.palette.grey[900]}}  variant="h5">Revenue</Typography>
              {/* @ts-expect-error */}
              <Typography variant="h6">{metrics.revenue.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card style={{ backgroundColor: theme.palette.error.main, color: theme.palette.error.contrastText }}>
            <CardContent>
              <Typography style={{color: theme.palette.grey[900]}} variant="h5">Bounced Cheques</Typography>
              <Typography variant="h6" style={{ color: theme.palette.error.contrastText }}>
                {/* @ts-expect-error */}
                {metrics.bouncedCheques}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TopCardMetrics;
