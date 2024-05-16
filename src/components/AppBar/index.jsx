import React from 'react';
import ModeSelect from '~/components/ModeSelect';
import Box from '@mui/material/Box';

import { ReactComponent as trelloLogo } from '~/assets/mdi--trello.svg';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import { Badge, Button, TextField, Tooltip, Typography } from '@mui/material';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Teamplates from './Menus/Teamplates';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from './Menus/Profiles';

function AppBar() {
    return (
        <Box
            px={2}
            sx={{
                width: '100%',
                height: (theme) => theme.trello.appBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <AppsIcon sx={{ color: 'primary.main' }} />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                    }}
                >
                    <SvgIcon component={trelloLogo} inheritViewBox sx={{ color: 'primary.main' }} />
                    <Typography
                        variant="span"
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            color: 'primary.main',
                        }}
                    >
                        Trello
                    </Typography>

                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Teamplates />

                    <Button variant="outlined">Create</Button>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <TextField id="outlined-search" label="Search..." type="search" size="small" />

                <ModeSelect />

                <Tooltip title="Notification">
                    <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon />
                    </Badge>
                </Tooltip>

                <Tooltip title="Help">
                    <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                        <HelpOutlineIcon />
                    </Badge>
                </Tooltip>

                <Profiles />
            </Box>
        </Box>
    );
}

export default AppBar;
