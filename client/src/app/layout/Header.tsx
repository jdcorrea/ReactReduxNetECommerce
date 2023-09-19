import { AppBar, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const midLinks = [
  {title: 'catalog', path: '/catalog'},
  {title: 'about', path: '/about'},
  {title: 'contact', path: '/contact'},
]

const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},
]

const navStyles = {
  color: 'inherit', 
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
}

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

function Header({darkMode, handleThemeChange}: Props) {
  return (
    <AppBar position="static" sx={{mb: 4}}>
      <Toolbar 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant="h6" component={NavLink} 
            to='/'
            sx={navStyles}
          >
            React Store
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange}/>
        </Box>
        <Box display='flex' alignItems='center'>
          <List sx={{display: 'flex'}}>
            {midLinks.map(({title, path}) => (
              <ListItem 
                key={path} 
                component={NavLink} 
                to={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box display='flex' alignItems='center'>
          <IconButton size='large' edge='start' color='inherit' sx={{mr: 2}}>
            <Badge badgeContent={4} color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <List sx={{display: 'flex'}}>
            {rightLinks.map(({title, path}) => (
              <ListItem 
                key={path} 
                component={NavLink} 
                to={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header