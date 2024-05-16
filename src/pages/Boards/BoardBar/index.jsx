import { Avatar, AvatarGroup, Button, Chip, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

const MENU_STYLES = {
    color: 'white',
    bgcolor: 'transparent',
    paddingX: '5px',
    borderRadius: '4px',
    '.MuiSvgIcon-root': {
        color: 'white',
    },
    '&: hover': {
        bgcolor: 'primary.50',
    },
};

function BoardBar() {
    return (
        <Box
            sx={{
                width: '100%',
                height: (theme) => theme.trello.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflowX: 'auto',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                borderBottom: '1px solid white',
                paddingX: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Chip sx={MENU_STYLES} icon={<LocalCafeIcon />} label="TranPhongDev MERN Stack Board" clickable />
                <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label="Public/Private Workspaces" clickable />
                <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add To Google Drive" clickable />
                <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" clickable />
                <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Button
                    variant="outlined"
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&: hover': { borderColor: 'white' },
                    }}
                    startIcon={<PersonAddAlt1Icon />}
                >
                    Invite
                </Button>
                <AvatarGroup
                    sx={{
                        '& .MuiAvatar-root': {
                            width: '32px',
                            height: '32px',
                            fontSize: 16,
                            borderColor: 'white',
                            color: 'white',
                            '&:first-of-type': { bgcolor: '#a4b0be' },
                        },
                    }}
                    max={4}
                >
                    <Tooltip title="tranphongdev">
                        <Avatar
                            alt="tranphongdev"
                            src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/357372337_1974092692955370_3935044616691468793_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG7_PO6slmAgB597LSNV4CQs_RubswRavez9G5uzBFq979kGjEacn-fyYRVDxSMM9iGOij4rrzjZFA5CT-E0BPu&_nc_ohc=L_f0N5XCuTsQ7kNvgFnVk29&_nc_ht=scontent.fhan5-9.fna&oh=00_AYDm2gZVKiSSyaRtMeAtquRwuyF59BanQ35gviWMut9JVw&oe=664B63A3"
                        />
                    </Tooltip>
                    <Tooltip title="tranphongdev">
                        <Avatar
                            alt="tranphongdev"
                            src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/357372337_1974092692955370_3935044616691468793_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG7_PO6slmAgB597LSNV4CQs_RubswRavez9G5uzBFq979kGjEacn-fyYRVDxSMM9iGOij4rrzjZFA5CT-E0BPu&_nc_ohc=L_f0N5XCuTsQ7kNvgFnVk29&_nc_ht=scontent.fhan5-9.fna&oh=00_AYDm2gZVKiSSyaRtMeAtquRwuyF59BanQ35gviWMut9JVw&oe=664B63A3"
                        />
                    </Tooltip>
                    <Tooltip title="tranphongdev">
                        <Avatar
                            alt="tranphongdev"
                            src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/357372337_1974092692955370_3935044616691468793_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG7_PO6slmAgB597LSNV4CQs_RubswRavez9G5uzBFq979kGjEacn-fyYRVDxSMM9iGOij4rrzjZFA5CT-E0BPu&_nc_ohc=L_f0N5XCuTsQ7kNvgFnVk29&_nc_ht=scontent.fhan5-9.fna&oh=00_AYDm2gZVKiSSyaRtMeAtquRwuyF59BanQ35gviWMut9JVw&oe=664B63A3"
                        />
                    </Tooltip>
                    <Tooltip title="tranphongdev">
                        <Avatar
                            alt="tranphongdev"
                            src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/357372337_1974092692955370_3935044616691468793_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG7_PO6slmAgB597LSNV4CQs_RubswRavez9G5uzBFq979kGjEacn-fyYRVDxSMM9iGOij4rrzjZFA5CT-E0BPu&_nc_ohc=L_f0N5XCuTsQ7kNvgFnVk29&_nc_ht=scontent.fhan5-9.fna&oh=00_AYDm2gZVKiSSyaRtMeAtquRwuyF59BanQ35gviWMut9JVw&oe=664B63A3"
                        />
                    </Tooltip>
                    <Tooltip title="tranphongdev">
                        <Avatar
                            alt="tranphongdev"
                            src="https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/357372337_1974092692955370_3935044616691468793_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG7_PO6slmAgB597LSNV4CQs_RubswRavez9G5uzBFq979kGjEacn-fyYRVDxSMM9iGOij4rrzjZFA5CT-E0BPu&_nc_ohc=L_f0N5XCuTsQ7kNvgFnVk29&_nc_ht=scontent.fhan5-9.fna&oh=00_AYDm2gZVKiSSyaRtMeAtquRwuyF59BanQ35gviWMut9JVw&oe=664B63A3"
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    );
}

export default BoardBar;
