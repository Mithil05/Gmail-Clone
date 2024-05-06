
import React, { useEffect, useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import { API_URLS } from '../services/api.urls.js';
import useApi from '../hooks/useApi.jsx';
import { Checkbox, Box, List } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import Email from './Email.jsx';
import NoMails from './common/NoMails.jsx';
import { EMPTY_TABS } from '../constants/constant.js';

const Emails = () => {

    const [selectedEmails, setSelectedEmails] = useState([]);
    
    const [refreshScreen, setRefreshScreen] = useState(false);

    const { openDrawer } = useOutletContext();
    const { type } = useParams();

    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
    const deleteEmailService = useApi(API_URLS.deleteEmail);

    useEffect(() => {
        getEmailsService.call({}, type);
    }, [type, refreshScreen])

    const selectAllEmails = (e) => {
        if (e.target.checked) {
            const emails = getEmailsService?.response?.map(email => email._id);
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = (e) => {
        if (type === 'bin') {
            deleteEmailService.call(selectedEmails);
        } else {
            moveEmailsToBin.call(selectedEmails);
        }
        setRefreshScreen(prevState => !prevState);
    }

    return (
        <Box style={ openDrawer ? { marginLeft: 250, marginTop: -50, width: 'calc(100% - 250px)' } : { marginTop: -50, width: '100%' }}>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size='small' onChange={(e) => selectAllEmails(e)}/>
                <DeleteOutline onClick={(e) => deleteSelectedEmails(e)}/>
            </Box>
            <List>
                {
                    getEmailsService?.response?.map(email => (
                        <Email 
                            email={email} 
                            key={email.id}
                            selectedEmails={selectedEmails}
                            setSelectedEmails={setSelectedEmails}
                            setRefreshScreen = {setRefreshScreen}
                        />
                    ))
                }
            </List> 
            {
                getEmailsService?.response?.length === 0 &&
                    <NoMails message={EMPTY_TABS[type]} />
            }
        </Box>
    )
}

export default Emails