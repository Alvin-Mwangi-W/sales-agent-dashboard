/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetCollectionsQuery, useUpdateCollectionStatusMutation } from "@/state/api";
import { Collection } from "@/state/types";
import {
  Box,
  
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { Cancel } from "@mui/icons-material";
import DashboardBox from "@/components/DashboardBox";

const Collections = () => {
  const {
    data: collections = [],
    isLoading,
    isError,
  } = useGetCollectionsQuery();
  const [updateCollectionStatus] = useUpdateCollectionStatusMutation();

  if (isLoading)
    return <Typography variant="h6">Loading collections...</Typography>;
  if (isError)
    return <Typography variant="h6">Error fetching collections</Typography>;

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
    <DashboardBox maxWidth="lg">
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
                        <GridCheckCircleIcon style={{ color: "green" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Bounced" placement="top">
                        <Cancel style={{ color: "red" }} />
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell>{collection.amountCollected}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        // @ts-expect-error
                        handleStatusChange(collection, !collection.status)
                      }
                    >
                      {collection.status === "Valid" ? (
                        <Cancel style={{ color: "red" }} />
                      ) : (
                        <GridCheckCircleIcon style={{ color: "green" }} />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardBox>
  );
};

export default Collections;
