import { Collections } from "@mui/icons-material";
import SchoolInvoices from "./SchooInvoices";
import SchoolsView from "./SchoolsView";
import { Box, useTheme } from "@mui/material";


const Schools = () => {
  const palette = useTheme().palette;
  return (
    <>
    <SchoolsView />
    <SchoolInvoices theme={palette.background.default}/> 
    <Box>
      <Collections />
    </Box>
    </>
  );
};

export default Schools;
