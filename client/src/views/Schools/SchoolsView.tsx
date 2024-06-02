/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useMemo } from 'react';
import { useGetSchoolsQuery, useGetInvoicesQuery, useGetCollectionsQuery } from "@/state/api";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme
} from '@mui/material';

const SchoolsView = () => {
  const { data: schools, isLoading: schoolsLoading, error: schoolsError } = useGetSchoolsQuery();
  const { data: invoices, isLoading: invoicesLoading, error: invoicesError } = useGetInvoicesQuery();
  const { data: collections, isLoading: collectionsLoading, error: collectionsError } = useGetCollectionsQuery();
  const palette = useTheme().palette;
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [open, setOpen] = useState(false);

  // @ts-expect-error
  const handleOpen = (school) => {
    setSelectedSchool(school);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSchool(null);
  };

  const filteredInvoices = useMemo(() => {
    if (!selectedSchool || !invoices) return [];
    // @ts-expect-error
    return invoices.filter(invoice => invoice.schoolName === selectedSchool.name);
  }, [selectedSchool, invoices]);

  const filteredCollections = useMemo(() => {
    if (!selectedSchool || !collections) return [];
    // @ts-expect-error
    return collections.filter(collection => collection.schoolName === selectedSchool.name);
  }, [selectedSchool, collections]);

  if (schoolsLoading || invoicesLoading || collectionsLoading) return <Typography>Loading...</Typography>;
  // @ts-expect-error
  if (schoolsError || invoicesError || collectionsError) return <Typography>Error: {schoolsError?.message || invoicesError?.message || collectionsError?.message}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Schools
      </Typography>
      <List>
        {schools?.map((school) => (
          <ListItem key={school.name} divider>
            <ListItemText
              primary={school.name}
              secondary={`${school.type} | ${school.product}`}
            />
            <Button variant="contained" color="primary" onClick={() => handleOpen(school)}>
              View Details
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {/* @ts-expect-error */}
        <DialogTitle>{selectedSchool?.name}</DialogTitle>
        <DialogContent>
          <Typography color={palette.grey[800]}>
            {/* @ts-expect-error */}
          <Typography variant="subtitle1">Type: {selectedSchool?.type}</Typography>
          {/* @ts-expect-error */}
          <Typography variant="subtitle1">Product: {selectedSchool?.product}</Typography>
          {/* @ts-expect-error */}
          <Typography variant="subtitle1">County: {selectedSchool?.county}</Typography>
          {/* @ts-expect-error */}
          <Typography variant="subtitle1">Registration Date: {selectedSchool?.registrationDate}</Typography>
          {/* @ts-expect-error */}
          <Typography variant="subtitle1">Phone: {selectedSchool?.contactInformation.phone}</Typography>
          {/* @ts-expect-error */}
          <Typography variant="subtitle1">Email: {selectedSchool?.contactInformation.email}</Typography>
          </Typography>
          
          <Divider sx={{ my: 2 }} />

          <Typography  variant="h6" >Invoices</Typography>
          <List>
            {filteredInvoices?.map((invoice, index) => (
              <ListItem  key={index} divider>
                <ListItemText
                  primary={`Due Date: ${invoice.dueDate}`}
                  secondary={`Amount Due: ${invoice.amountDue}`}
                />
                <Button variant="contained" color="secondary">Collect Payment</Button>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Collections</Typography>
          <List>
            {filteredCollections?.map((collection, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Collection Date: ${collection.collectionDate}`}
                  secondary={`Amount Collected: ${collection.amountCollected}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SchoolsView;
