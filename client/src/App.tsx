import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"
import { useMemo } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "@emotion/react"
import { Box, CssBaseline } from "@mui/material"
import NavBar from "./views/navbar"
import Dashboard from "./views/Dashboard"
import { School } from "@mui/icons-material"

function App() {

  const theme = useMemo(() => createTheme(themeSettings), [])
  const { collapseSidebar } = useProSidebar();
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width={"100%"} height={"100"} padding={"1rem 2rem 4rem 2rem"}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schools" element={<School />} />
          </Routes>
        </Box>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
