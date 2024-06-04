/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { themeSettings } from "@/theme";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";


type Props = {
  invoices: {
    invoiceNumber: string;
    invoiceItem: string;
    creationDate: string;
    dueDate: string;
    amountDue: string;
    paidAmount: string;
    balance: string;
    completionStatus: string;
    daysUntilDue: string;
  }[];
  handleOpenEditDialog: (invoice: any) => void;
  handleDeleteInvoice: (invoice: any) => void;
};

const TableComponent = (props: Props) => {
  const { invoices, handleOpenEditDialog, handleDeleteInvoice } = props; 
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: themeSettings.palette.background.light }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Invoice Number
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Item
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Creation Date
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Due Date
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Amount Due
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Paid Amount
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Balance
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Completion Status
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Days Until Due
            </TableCell>
            <TableCell
              sx={{
                color: themeSettings.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoiceNumber}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: themeSettings.palette.background.default,
                },
              }}
            >
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.invoiceItem}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.creationDate}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.dueDate}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.amountDue}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.paidAmount}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.balance}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.completionStatus}
              </TableCell>
              <TableCell sx={{ color: themeSettings.palette.text.secondary }}>
                {invoice.daysUntilDue}
              </TableCell>
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
  );
};

export default TableComponent;
