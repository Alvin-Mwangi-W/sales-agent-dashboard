/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetInvoicesQuery } from "@/state/api";
import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

const UpcomingInvoices = () => {
  const { data: invoices, isLoading, error } = useGetInvoicesQuery();
  const palette = useTheme().palette;
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [open, setOpen] = useState(false);

  // @ts-expect-error
  const handleOpen = (invoice) => {
    setSelectedInvoice(invoice);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInvoice(null);
  };

  if (isLoading) return <CircularProgress />;
  {/* @ts-expect-error */}
  if (error) return <Typography>Error: {error.message}</Typography>;

  const sortedInvoices = invoices?.slice().sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Upcoming Invoices
      </Typography>
      <List>
        {sortedInvoices?.map((invoice) => (
          <ListItem key={invoice.schoolName} divider>
            <ListItemText
              primary={invoice.schoolName}
              secondary={`Amount Due: $${invoice.amountDue} | Due Date: ${invoice.dueDate}`}
            />
            <Button variant="contained" color="primary" onClick={() => handleOpen(invoice)}>
              Collect Payment
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Collect Payment</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <>
              <Typography variant="body1" color={palette.grey[800]}>
                {/* @ts-expect-error */}
                School: {selectedInvoice.schoolName}
              </Typography>
              <Typography variant="body1" color={palette.grey[800]}>
                {/* @ts-expect-error */}
                Amount Due: ${selectedInvoice.amountDue}
              </Typography>
              <Typography variant="body1" color={palette.grey[800]}>
                {/* @ts-expect-error */}
                Due Date: {selectedInvoice.dueDate}
              </Typography>
              {/* Add form fields for payment collection here */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpcomingInvoices;
