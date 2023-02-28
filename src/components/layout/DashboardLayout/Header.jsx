import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { LayoutContext } from '../../../context/layout.context';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useAuth } from '../../../stores';

function Header() {
  const user = useAuth(state => state.user)
  const navigation = useNavigate()
  const layoutContext = React.useContext(LayoutContext)
  const logout = () => {
    document.cookie = JSON.stringify({})
    navigation('/login')
  }
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='fixed'
      sx={{
        width: { md: user?.access_level <= 50 ? '100%' : `calc(100% - ${layoutContext.drawerWidth}px)` },
        ml: { md: `${layoutContext.drawerWidth}px` }, background: '#75aee8db', boxShadow: '0px 0px 10px 0px #75aee8db'
      }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          onClick={() => layoutContext.setOpenDrawer(!layoutContext.openDrawer)}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ fontSize: '40px' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ mt: '40px' }}
          >
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={logout}><PowerSettingsNewIcon sx={{mr: 1, color: 'red'}}></PowerSettingsNewIcon> Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header