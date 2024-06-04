import { useGetCollectionsQuery, useUpdateCollectionStatusMutation } from "@/state/api";
import { Collection } from "@/state/types";
import { 
  Typography,
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
import GridCheckCircleIcon from "@mui/icons-material/CheckCircle"; // Corrected import
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ResponsiveContainer } from "recharts";

const CollectionsTable = () => {
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
    <ResponsiveContainer width="100%" height={"80%"}>
      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Collections
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="collections table">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[900] }}>
                <TableCell sx={{ color: theme.palette.grey[300] }}>Invoice Number</TableCell>
                <TableCell sx={{ color: theme.palette.grey[300] }}>Collection Number</TableCell>
                <TableCell sx={{ color: theme.palette.grey[300] }}>Date of Collection</TableCell>
                <TableCell sx={{ color: theme.palette.grey[300] }}>Status</TableCell>
                <TableCell sx={{ color: theme.palette.grey[300] }}>Amount</TableCell>
                <TableCell sx={{ color: theme.palette.grey[300] }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collections.map((collection) => (
                <TableRow key={collection.collectionNumber} sx={{ backgroundColor: theme.palette.grey[800] }}>
                  <TableCell sx={{ color: theme.palette.grey[300] }}>{collection.invoiceNumber}</TableCell>
                  <TableCell sx={{ color: theme.palette.grey[300] }}>{collection.collectionNumber}</TableCell>
                  <TableCell sx={{ color: theme.palette.grey[300] }}>{collection.collectionDate}</TableCell>
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
                  <TableCell sx={{ color: theme.palette.grey[300] }}>{collection.amountCollected}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleStatusChange(collection, collection.status === "Valid" ? "Bounced" : "Valid")}
                    >
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
    </ResponsiveContainer>
  );
};

export default CollectionsTable;
