import './styles.css'
import Header from './Header'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useEffect, useState } from "react"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie } from '@app/util/util'
import agent from '@app/api/agent'
import Loading from './Loading'
import { useAppDispatch } from '@app/store/configureStore'
import { setBasket } from '@features/baskets/basketSlice'

function App() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [dispatch])

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

  if (loading) return <Loading />

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
          <CssBaseline />
          <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
          <Container>
            <Outlet />
          </Container>
      </ThemeProvider>
    </>
  )
}

export default App
