import { Collections } from "@mui/icons-material";
import SchoolInvoices from "./SchooInvoices";
import SchoolsView from "./SchoolsView";
import { Box, useTheme } from "@mui/material";


const Schools = () => {
  return (
    <>
    <SchoolsView />
    <SchoolInvoices /> 
    <Box>
      <Collections />
    </Box>
    </>
  );
};

export default Schools;
