import React, { createContext, useState } from 'react'

export const LayoutContext = createContext()


function LayoutContextProvider(props) {
    const innerWidth = window.innerWidth
    const drawerWidth = 250
    const [openDrawer, setOpenDrawer] = useState(innerWidth > 900)
  return (
    <LayoutContext.Provider value={{
        drawerWidth,
        innerWidth,
        openDrawer,
        setOpenDrawer
    }
    }>
        {props.children}
    </LayoutContext.Provider>
  )
}

export default LayoutContextProvider