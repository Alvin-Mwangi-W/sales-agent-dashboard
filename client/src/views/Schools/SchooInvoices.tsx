/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { useGetInvoicesQuery } from "@/state/api";
import { Invoice } from "@/state/types";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

//import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";

//@ts-expect-error
const SchoolInvoices = ({ theme }) => {
  const { data: invoicesData, isLoading, error } = useGetInvoicesQuery();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData);
    }
  }, [invoicesData]);

  const handleOpenAddDialog = () => {
    setSelectedInvoice(null);
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedInvoice(null);
    setOpenEditDialog(false);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    setInvoices(invoices.filter(inv => inv.invoiceNumber !== invoice.invoiceNumber));
  };

  const handleSaveInvoice = () => {
    if (selectedInvoice) {
      setInvoices(invoices.map(inv => (inv.invoiceNumber === selectedInvoice.invoiceNumber ? selectedInvoice : inv)));
    } else {
      setInvoices([...invoices, selectedInvoice!]);
    }
    handleCloseAddDialog();
    handleCloseEditDialog();
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  //@ts-expect-error
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom style={{ color: themeSettings.palette.text.primary }}>
        School Invoices
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add Invoice
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: themeSettings.palette.background.light }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Invoice Number</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Item</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Creation Date</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Due Date</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Amount Due</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Paid Amount</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Balance</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Completion Status</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Days Until Due</TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.primary, fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoiceNumber} sx={{ '&:nth-of-type(odd)': { backgroundColor: themeSettings.palette.background.default } }}>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.invoiceNumber}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.invoiceItem}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.creationDate}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.dueDate}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.amountDue}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.paidAmount}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.balance}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.completionStatus}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>{invoice.daysUntilDue}</TableCell>
                <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Tooltip title="Edit Invoice">
                        <IconButton onClick={() => handleOpenEditDialog(invoice)}>
                          <AddIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Delete Invoice">
                        <IconButton onClick={() => handleDeleteInvoice(invoice)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Invoice Dialog */}
      <Dialog open={openAddDialog || openEditDialog} onClose={handleCloseAddDialog || handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedInvoice ? 'Edit Invoice' : 'Add New Invoice'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Invoice Number"
            fullWidth
            disabled={selectedInvoice ? true : false} // Disable for editing
            value={selectedInvoice ? selectedInvoice.invoiceNumber : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              invoiceNumber: e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Invoice Item"
            fullWidth
            value={selectedInvoice ? selectedInvoice.invoiceItem : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              invoiceItem: e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Creation Date"
            type="date"
            fullWidth
            value={selectedInvoice ? selectedInvoice.creationDate : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              creationDate: e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Due Date"
            type="date"
            fullWidth
            value={selectedInvoice ? selectedInvoice.dueDate : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              dueDate: e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Amount Due"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.amountDue : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              amountDue: +e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Paid Amount"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.paidAmount : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              paidAmount: +e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Balance"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.balance : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              balance: +e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Completion Status"
            fullWidth
            value={selectedInvoice ? selectedInvoice.completionStatus : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              completionStatus: e.target.value
            }))}
          />
          <TextField
            margin="normal"
            label="Days Until Due"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.daysUntilDue : ''}
            onChange={(e) => setSelectedInvoice((prevState) => ({
              ...prevState!,
              daysUntilDue: +e.target.value
            }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={selectedInvoice ? handleCloseEditDialog : handleCloseAddDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveInvoice} color="primary">
            {selectedInvoice ? 'Save Changes' : 'Add Invoice'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SchoolInvoices;
