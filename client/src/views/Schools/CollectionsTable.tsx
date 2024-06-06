import { useState, useEffect } from "react";
import { useGetCollectionsQuery } from "@/state/api";
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
  useTheme,
  CircularProgress,
} from "@mui/material";
import GridCheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ResponsiveContainer } from "recharts";
import BoxHeader from "@/components/BoxHeader";

const CollectionsTable = () => {
  const theme = useTheme();
  const { data: collections = [], isLoading, isError } = useGetCollectionsQuery();
  const [localCollections, setLocalCollections] = useState<Collection[]>([]);

  // Initialize local state with fetched collections
  useEffect(() => {
    setLocalCollections(collections);
  }, [collections]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography variant="h6">Error fetching collections</Typography>;

  const handleStatusChange = (collectionNumber: string) => {
    setLocalCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.collectionNumber === collectionNumber
          ? { ...collection, status: collection.status === "Valid" ? "Bounced" : "Valid" }
          : collection
      )
    );
  };

  return (
    <ResponsiveContainer width="100%" height={"80%"}>
      <Box mt={6}>
        <BoxHeader title="Collections" subtitle="" />
        <TableContainer component={Paper} sx={{mt: 2}}>
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
              {localCollections.map((collection) => (
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
                      onClick={() => handleStatusChange(collection.collectionNumber)}
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
