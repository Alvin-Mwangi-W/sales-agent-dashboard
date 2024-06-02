/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  color: theme.palette.text.primary,
  borderRadius: "1rem",
  boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, 0.3)",
}));

const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
// @ts-expect-error 
const MetricCard = ({ title, value, breakdown }) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        {breakdown && (
          <Box mt={2}>
            {Object.keys(breakdown).map((key) => (
              <Typography variant="body2" key={key}>
                {key}: {breakdown[key]}
              </Typography>
            ))}
          </Box>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default MetricCard;
