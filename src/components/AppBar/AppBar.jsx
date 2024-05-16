import { useState } from 'react';
import Box from '@mui/material/Box';
import { ReactComponent as trelloLogo } from '~/assets/mdi--trello.svg';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import { Badge, Button, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import ModeSelect from '~/components/ModeSelect/ModeSelect';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Teamplates from './Menus/Teamplates';
import Profiles from './Menus/Profiles';

function AppBar() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Box
            sx={{
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                overflowX: 'auto',
                paddingX: 2,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <AppsIcon sx={{ color: 'white' }} />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                    }}
                >
                    <SvgIcon component={trelloLogo} fontSize="small" inheritViewBox sx={{ color: 'white' }} />
                    <Typography
                        variant="span"
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: 'white',
                        }}
                    >
                        Trello
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                        }}
                    >
                        <Workspaces />
                        <Recent />
                        <Starred />
                        <Teamplates />
                        <Button
                            sx={{
                                color: 'white',
                                border: 'none',
                                '&: hover': {
                                    border: 'none',
                                },
                            }}
                            variant="outlined"
                            startIcon={<AddToPhotosIcon />}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <TextField
                    id="outlined-search"
                    label="Search..."
                    type="text"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <CloseIcon
                                fontSize="small"
                                sx={{
                                    color: searchValue ? 'white' : 'transparent',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setSearchValue('')}
                            />
                        ),
                    }}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '180px',
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />

                <ModeSelect />

                <Tooltip title="Notification">
                    <Badge color="error" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>

                <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
                    <HelpOutlineIcon sx={{ color: 'white' }} />
                </Tooltip>

                <Profiles />
            </Box>
        </Box>
    );
}

export default AppBar;
