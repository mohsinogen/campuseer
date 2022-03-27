import React from 'react'

import { COffcanvas, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from './_nav'


const Sidebar = ({showSidebar,setShowSidebar}) => {

  return (<COffcanvas visible={showSidebar}> 
    <CSidebar
      position="fixed"
      unfoldable={false}
      visible={showSidebar}
      
     
    >
     <CSidebarBrand className="d-none d-md-flex" to="/">
      <div>campuseer</div>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => setShowSidebar(!showSidebar)}
      />
    </CSidebar></COffcanvas>
  )
}

export default React.memo(Sidebar)