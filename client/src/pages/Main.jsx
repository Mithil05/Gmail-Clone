import { Suspense, useState } from 'react';
import SideBar from '../components/SideBar.jsx';
import Header from '../components/header.jsx';
import { Outlet } from 'react-router-dom';
import SuspenseLoader from '../components/common/SuspenseLoader.jsx';
import { Box } from '@mui/material';

const Main = () => {
    const [openDrawer, setOpenDrawer] = useState(true)

    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    }
    return (
        <>
            <Header toggleDrawer={toggleDrawer}/>
            <Box>
                <SideBar openDrawer={openDrawer}/>     
                <Suspense fallback={<SuspenseLoader/>}>
                    <Outlet context={{ openDrawer }}/>                     
                </Suspense>     
            </Box>
        </>
    )
}

export default Main;