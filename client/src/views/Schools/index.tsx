import SchoolInvoices from "./SchooInvoices";
import SchoolsView from "./SchoolsView";
import CollectionsTable from "./CollectionsTable";


const Schools = () => {
  return (
    <>
    <SchoolsView />
    <SchoolInvoices theme={"grey"} /> 
    <CollectionsTable />    
    </>
  );
};

export default Schools;
