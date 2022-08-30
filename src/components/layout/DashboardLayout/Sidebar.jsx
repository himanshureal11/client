import React, { useContext, useEffect, useState } from 'react'
import {NavLink, useLocation } from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import { Box } from '@mui/system';
import { Divider, List, ListItem, ListItemButton, Toolbar } from '@mui/material';
import { LayoutContext } from '../../../context/layout.context';
import ROUTES from '../../../constant/routes';
import { useAuth } from '../../../stores';

function Sidebar() {
  const user = useAuth()
  const layoutContext = useContext(LayoutContext)
  const location = useLocation()
  const [index, setIndex] = useState(undefined)
  useEffect(() => {
    const path = ROUTES.findIndex((path) => location.pathname.includes(path.path))
    if(path >= 0){
      setIndex(path)
    }
  },[location])
  return (
    <Box
      component="nav"
      sx={{ width: { md: `${layoutContext.drawerWidth}px`}, flexShrink: { sm: 0 }, display: { xs: 'none', md: 'block', sm: 'none' }, }}
      aria-label="mailbox folders"
    >
      <Drawer variant={layoutContext.innerWidth > 900 ? 'permanent' : 'temporary'}
        sx={{
          display: { xs: layoutContext.innerWidth > 900 ? 'none' : 'block' , md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${layoutContext.drawerWidth}px`, background: '#000000c4' },
        }}
        open={layoutContext.openDrawer}
        onClose={()=>layoutContext.setOpenDrawer(!layoutContext.openDrawer)}
      >
        <Toolbar sx={{backgroundColor: '#1976d2', p: 0}}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <img src='https://real11.com/new_script/img/logo.png' alt='Real 11'  style={{width: '100%' }} />
          </div>
        </Toolbar>
        <Divider />
        <List>
          {ROUTES.map((route, i) => (
            <ListItem key={i} sx={{background: i === index ? '#1976d2' : 'none'}}>
              <ListItemButton>
                {Number(user?.user?.access_level) >= Number(route?.access_level) && <NavLink key={i} to={route.path} onClick={() => setIndex(i)} style={{textDecoration: 'none', fontSize: '1.5rem', color: '#fff', width: '100%'}}><Box component={'div'} sx={{display: 'flex', alignItems: 'center'}}>{route?.icon} &nbsp; {route.name}</Box></NavLink>}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

export default Sidebar