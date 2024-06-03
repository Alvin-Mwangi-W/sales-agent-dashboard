/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetMetricsQuery, useGetSignupsQuery } from "@/state/api";

const TargetVisualization = () => {
  const theme = useTheme();
  const { data: metrics } = useGetMetricsQuery();
  const { data: signupData } = useGetSignupsQuery();

  if (!metrics || !signupData) {
    return <Typography>Loading...</Typography>;
  }

  const data = signupData.map((signup) => ({
    product: signup.product,
    // @ts-expect-error
    target: signup.targetSignups,
    // @ts-expect-error
    actual: signup.actualSignups,
  }));

  const COLORS = [
    theme.palette.primary[800],
    theme.palette.primary[300],
    theme.palette.tertiary?.main || theme.palette.success.main,
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item xs={12} md={4} key={item.product}>
            <Card sx={{ backgroundColor: theme.palette.grey[900] }}>
              <CardContent>
                <Typography color={theme.palette.grey[100]} variant="h6">
                  {item.product}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Actual", value: item.actual },
                        { name: "Target", value: item.target - item.actual },
                      ]}
                      dataKey="value"
                      outerRadius={100}
                      fill="#8884d8"
                    >
                      {[
                        { name: "Actual", value: item.actual },
                        { name: "Target", value: item.target - item.actual },
                      ].map((_entry, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={COLORS[idx % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <RechartTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Typography>
                  Bounced Cheques:{" "}
                  <span style={{ color: theme.palette.error.main }}>
                    {metrics.bouncedCheques}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TargetVisualization;
