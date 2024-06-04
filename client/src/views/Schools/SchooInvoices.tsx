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
import TableComponent from "@/components/TableComponent";

//@ts-expect-error
const SchoolInvoices = ({ theme }) => {
  const { data: invoicesData, isLoading, error } = useGetInvoicesQuery();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    invoiceNumber: "",
    invoiceItem: "",
    creationDate: "",
    dueDate: "",
    amountDue: 0,
    paidAmount: 0,
    balance: 0,
    completionStatus: "",
    daysUntilDue: 0
  });

  useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData);
    }
  }, [invoicesData]);

  const handleOpenAddDialog = () => {
    setNewInvoice({
      invoiceNumber: "",
      invoiceItem: "",
      creationDate: "",
      dueDate: "",
      amountDue: 0,
      paidAmount: 0,
      balance: 0,
      completionStatus: "",
      daysUntilDue: 0
    });
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
      handleCloseEditDialog();
    } else {
      setInvoices([...invoices, newInvoice as Invoice]);
      handleCloseAddDialog();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedInvoice) {
      setSelectedInvoice({ ...selectedInvoice, [name]: name === 'amountDue' || name === 'paidAmount' || name === 'balance' || name === 'daysUntilDue' ? +value : value });
    } else {
      setNewInvoice({ ...newInvoice, [name]: name === 'amountDue' || name === 'paidAmount' || name === 'balance' || name === 'daysUntilDue' ? +value : value });
    }
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
            name="invoiceNumber"
            fullWidth
            disabled={!!selectedInvoice} // Disable for editing
            value={selectedInvoice ? selectedInvoice.invoiceNumber : newInvoice.invoiceNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Invoice Item"
            name="invoiceItem"
            fullWidth
            value={selectedInvoice ? selectedInvoice.invoiceItem : newInvoice.invoiceItem}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Creation Date"
            name="creationDate"
            type="date"
            fullWidth
            value={selectedInvoice ? selectedInvoice.creationDate : newInvoice.creationDate}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Due Date"
            name="dueDate"
            type="date"
            fullWidth
            value={selectedInvoice ? selectedInvoice.dueDate : newInvoice.dueDate}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Amount Due"
            name="amountDue"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.amountDue : newInvoice.amountDue}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Paid Amount"
            name="paidAmount"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.paidAmount : newInvoice.paidAmount}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Balance"
            name="balance"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.balance : newInvoice.balance}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Completion Status"
            name="completionStatus"
            fullWidth
            value={selectedInvoice ? selectedInvoice.completionStatus : newInvoice.completionStatus}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            label="Days Until Due"
            name="daysUntilDue"
            type="number"
            fullWidth
            value={selectedInvoice ? selectedInvoice.daysUntilDue : newInvoice.daysUntilDue}
            onChange={handleInputChange}
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
