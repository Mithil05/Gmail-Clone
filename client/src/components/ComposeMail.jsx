import styled from "@emotion/styled";
import { Close, DeleteOutlined } from "@mui/icons-material";
import { Dialog, Box, Typography, InputBase, TextField, Button } from "@mui/material";
import { useState } from "react";
import useApi from "../hooks/useApi.jsx";
import { API_URLS } from "../services/api.urls.js";

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0'
}

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 530;
    }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`

const ComposeMail = ({ openDialog, setOpenDialog }) => {
    const [data, setData] = useState({});
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const config = {
        Host : "smtp.elasticemail.com",
        Username : process.env.REACT_APP_NAME,
        Password : process.env.REACT_APP_PASSWORD,
        Port: 2525
    }

    const closeComposeMail = (e) => {
        e.preventDefault();
        
        const payload = {
            to: data.to,
            from: 'mithiljogi@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'The Gmail Clone',
            type: 'drafts'
        }

        saveDraftService.call(payload);

        if(!saveDraftService.error){
            setOpenDialog(false);
            setData({});
        }else{

        }
    }

    
    const sendMail = (e) => {
        e.preventDefault();
        if(window.Email){
            window.Email.send({
                ...config,
                To : data.to,
                From : "mithiljogi@gmail.com",
                Subject : data.subject,
                Body : data.body
            }).then(
                message => alert(message)
            );
        }

        const payload = {
            to: data.to,
            from: 'mithiljogi@gmail.com',
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'The Gmail Clone',
            type: 'sent'
        }

        sentEmailService.call(payload);

        if(!sentEmailService.error){
            setOpenDialog(false);
            setData({});
        }else{

        }

        setOpenDialog(false);
    }
    
    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

  return (
    <Dialog 
        open={openDialog}
        PaperProps={{ sx: dialogStyle }}
    >
        <Header>
            <Typography>New Message</Typography>
            <Close fontSize="small" onClick={(e) => closeComposeMail(e)}/>
        </Header>
        <RecipientWrapper>
            <InputBase placeholder="To" name="to" onChange={(e) => onValueChange(e)}/>
            <InputBase placeholder="Subject" name="subject" onChange={(e) => onValueChange(e)}/>
        </RecipientWrapper>
        <TextField
            multiline
            rows={19}
            sx={{ '& .MuiOutlinedInput-notchedOutline': {border: 'none'}}}
            onChange={(e) => onValueChange(e)}
            name="body"
        />
        <Footer>
            <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
            <DeleteOutlined onClick={() => setOpenDialog(false)}/>
        </Footer>
    </Dialog>
  )
}

export default ComposeMail;