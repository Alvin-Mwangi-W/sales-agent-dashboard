import DashBoardBox from '@/components/DashboardBox'
import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => {
    const palette = useTheme().palette; 
    const [selected, setSelected] = useState("dashboard")
  return (
    <DashBoardBox height={"800px"} width={"250px"}>
        <Box sx={{"&:hover": { color: palette.primary[100]}}}>
            <Link 
                to={"/"}
                onClick={() => setSelected("dashboard")}
                style={{textDecoration: "inherit", color: selected === "dashboard" ? "inherit" : palette.grey[700]}}>
                    dashboard </Link>
            </Box> 
            <Box sx={{"&:hover": { color: palette.primary[100]}}}>
            <Link 
                to={"/schools"}
                onClick={() => setSelected("schools")}
                style={{textDecoration: "inherit", color: selected === "schools" ? "inherit" : palette.grey[700]}}>
                    Schools </Link>
            </Box> 
    </DashBoardBox>
  )
}

export default SideMenu