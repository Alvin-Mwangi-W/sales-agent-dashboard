/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from "@mui/material"
import { GridMenuIcon } from "@mui/x-data-grid";

type Props = {
    classes: any;
};

const styles = {
    root: {
        width: "100%",
    },
    flex: {
        flex: 1,
    },
    menuButton: {
    marginLeft: -12,
    marginRight: 20,
    },
}

const NavBar = (props: Props) => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    

  return (
    <div className="">
        <AppBar position="static">
            <Toolbar>
                <IconButton className={""} color="inherit" aria-label="Menu" onClick={() => props.toggleLeftbar()}>
                    <GridMenuIcon />
                </IconButton>
                <Typography>Hello </Typography>
            </Toolbar>
            
        </AppBar>
    </div>
  )
}

export default NavBar