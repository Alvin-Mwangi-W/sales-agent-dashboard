import React from "react";

import { GridCheckCircleIcon } from "@mui/x-data-grid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useGetCollectionsQuery, useUpdateCollectionStatusMutation } from "@/state/api";
import { Collection } from "@/state/types"; 
import { 
  Typography,
  Container,
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  IconButton,
  useTheme
 } from "@mui/material";

const Collections: React.FC = () => {
  const theme = useTheme();
  const { data: collections = [], isLoading, isError } = useGetCollectionsQuery();
  const [updateCollectionStatus] = useUpdateCollectionStatusMutation();

  if (isLoading) return <Typography variant="h6">Loading collections...</Typography>;
  if (isError) return <Typography variant="h6">Error fetching collections</Typography>;

  const handleStatusChange = (collection: Collection, newStatus: "Valid" | "Bounced") => {
    updateCollectionStatus({ collectionNumber: collection.collectionNumber, status: newStatus })
      .unwrap()
      .then(() => {
        console.log(`Successfully updated status of collection ${collection.collectionNumber} to ${newStatus}`);
      })
      .catch((error) => {
        console.error(`Failed to update status of collection ${collection.collectionNumber}`, error);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Collections
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collections table">
            <TableHead>
              <TableRow>
                <TableCell>Invoice Number</TableCell>
                <TableCell>Collection Number</TableCell>
                <TableCell>Date of Collection</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections.map((collection) => (
                <TableRow key={collection.collectionNumber}>
                  <TableCell>{collection.invoiceNumber}</TableCell>
                  <TableCell>{collection.collectionNumber}</TableCell>
                  <TableCell>{collection.collectionDate}</TableCell>
                  <TableCell>
                    {collection.status === "Valid" ? (
                      <Tooltip title="Valid" placement="top">
                        <GridCheckCircleIcon style={{ color: theme.palette.primary.main }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Bounced" placement="top">
                        <HighlightOffIcon style={{ color: theme.palette.error.main }} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{collection.amountCollected}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleStatusChange(collection, collection.status === "Valid" ? "Bounced" : "Valid")}>
                      {collection.status === "Valid" ? (
                        <HighlightOffIcon style={{ color: theme.palette.error.main }} />
                      ) : (
                        <GridCheckCircleIcon style={{ color: theme.palette.primary.main }} />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Collections;
