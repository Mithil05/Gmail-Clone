import {AppBar, Toolbar, styled, InputBase, Box} from '@mui/material';
import {Menu as MenuIcon, Search, Tune, HelpOutlineOutlined, SettingsOutlined, AppsOutlined, AccountCircleOutlined} from '@mui/icons-material';
import { gmailLogo } from '../constants/constant';

const StyledAppBar = styled(AppBar)`
    background: #f5F5F5;
    box-shadow: none;
`;

const SearchWrapper = styled(Box)({
    background: '#EAF1FB',
    marginLeft: 80,
    borderRadius: 8,
    minWidth: 690,
    maxWidth: 720,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20',
    '& > div': {
        width: '100%',
        padding: '0 10px'
    }
})

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: end;
    & > svg {
        margin-left: 20px;
    }
`


const Header = ({ toggleDrawer }) => {
    return(
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon onClick = {toggleDrawer} color='action'/>
                <img src={gmailLogo} alt="logo" style={{width: 110, marginLeft: 15}}/>
                <SearchWrapper>
                    <Search color='action'/>
                    <InputBase placeholder='Search mail'/>
                    <Tune color='action'/>
                </SearchWrapper>
                <OptionsWrapper>
                    <HelpOutlineOutlined color='action'/>
                    <SettingsOutlined color='action'/>
                    <AppsOutlined color='action'/>
                    <AccountCircleOutlined color='action'/>
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;