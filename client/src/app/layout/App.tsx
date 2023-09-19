import Catalog from "features/catalog/Catalog"
import './styles.css'
import Header from './Header'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useState } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(prevState => !prevState)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
