import { CreateOutlined } from "@mui/icons-material";
import { Box, Button, styled, List, ListItem } from "@mui/material";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import ComposeMail from "./ComposeMail";
import { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {routes} from '../routes/routes.js';

const ComposeButton = styled(Button)`
    background: #c2e7ff;
    color: #001d35;
    border-radius: 16px;
    padding: 15px;
    min-width: 140px;
    text-transform: none;
`

const Container = styled(Box)`
    padding: 8px;
    & > ul {
        padding: 10px 0 0 5px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        & > a {
            text-decoration: none;
            color: inherit;
        }
        & > a > li > svg {
            margin-right: 20px;
        }
    }
`


const SideBarContent = () => {

    const [openDialog, setOpenDialog] = useState(false);
    const { type } = useParams();

    const onComposeClick = () => {
        setOpenDialog(true);
    }
  return (
    <Container>
        <ComposeButton onClick={() => onComposeClick()} style={{display: 'flex'}}> <CreateOutlined/> Compose</ComposeButton>
        <List>
            {
                SIDEBAR_DATA.map(data => (
                    <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                        <ListItem style={ type === data.name.toLowerCase() ? {
                            backgroundColor: '#d3e3fd',
                            borderRadius: '0 16px 16px 0'
                        } : {}}><data.icon fontSize="small" />{data.title}</ListItem>
                    </NavLink>
                ))
            }
        </List>
        <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    </Container>
  )
}

export default SideBarContent;