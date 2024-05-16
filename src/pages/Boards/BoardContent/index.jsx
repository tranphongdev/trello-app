import Box from '@mui/material/Box';
import React from 'react';
import { Cloud, ContentCopy, ContentCut, ContentPaste, ExpandMore } from '@mui/icons-material';
import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AttachmentIcon from '@mui/icons-material/Attachment';

const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';

function BoardContent() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0',
            }}
        >
            <Box
                sx={{
                    bgcolor: 'inherit',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    '&::-webkit-scrollbar-track': { m: 2 },
                }}
            >
                <Box
                    sx={{
                        minWidth: '300px',
                        maxWidth: '300px',
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                        ml: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
                    }}
                >
                    <Box
                        sx={{
                            height: COLUMN_HEADER_HEIGHT,
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                            variant="h6"
                            fontSize="1rem"
                        >
                            Column title
                        </Typography>
                        <Box>
                            <Tooltip title="More options">
                                <KeyboardArrowDownIcon
                                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                                    id="basic-column-dropdown"
                                    aria-controls={open ? 'basic-menu-dropdown' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                />
                            </Tooltip>
                            <Menu
                                id="basic-menu-dropdown"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-column-dropdown',
                                }}
                            >
                                <MenuItem>
                                    <ListItemIcon>
                                        <AddCardIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Add new card</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentCut fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentCopy fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentPaste fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Paste</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <DeleteForeverIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Remove this column</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Cloud fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Archive this column</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            p: '0 5px',
                            m: '0 5px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            maxHeight: (theme) =>
                                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(
                                    5,
                                )} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} )`,
                            '::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
                            '::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' },
                        }}
                    >
                        <Card
                            sx={{
                                cursor: 'pointer',
                                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                                overflow: 'unset',
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                title="green iguana"
                            />
                            <CardContent
                                sx={{
                                    p: 1.5,
                                    '&: last-child': { p: 1.5 },
                                }}
                            >
                                <Typography>TranPhongDev MERN Stack</Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    p: '0 4px 8px 4px',
                                }}
                            >
                                <Button startIcon={<GroupIcon />} size="small">
                                    20
                                </Button>
                                <Button startIcon={<ModeCommentIcon />} size="small">
                                    15
                                </Button>
                                <Button startIcon={<AttachmentIcon />} size="small">
                                    10
                                </Button>
                            </CardActions>
                        </Card>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                                overflow: 'unset',
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                title="green iguana"
                            />
                            <CardContent
                                sx={{
                                    p: 1.5,
                                    '&: last-child': { p: 1.5 },
                                }}
                            >
                                <Typography>TranPhongDev MERN Stack</Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    p: '0 4px 8px 4px',
                                }}
                            >
                                <Button startIcon={<GroupIcon />} size="small">
                                    20
                                </Button>
                                <Button startIcon={<ModeCommentIcon />} size="small">
                                    15
                                </Button>
                                <Button startIcon={<AttachmentIcon />} size="small">
                                    10
                                </Button>
                            </CardActions>
                        </Card>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                                overflow: 'unset',
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                title="green iguana"
                            />
                            <CardContent
                                sx={{
                                    p: 1.5,
                                    '&: last-child': { p: 1.5 },
                                }}
                            >
                                <Typography>TranPhongDev MERN Stack</Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    p: '0 4px 8px 4px',
                                }}
                            >
                                <Button startIcon={<GroupIcon />} size="small">
                                    20
                                </Button>
                                <Button startIcon={<ModeCommentIcon />} size="small">
                                    15
                                </Button>
                                <Button startIcon={<AttachmentIcon />} size="small">
                                    10
                                </Button>
                            </CardActions>
                        </Card>
                        <Card
                            sx={{
                                cursor: 'pointer',
                                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                                overflow: 'unset',
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                title="green iguana"
                            />
                            <CardContent
                                sx={{
                                    p: 1.5,
                                    '&: last-child': { p: 1.5 },
                                }}
                            >
                                <Typography>TranPhongDev MERN Stack</Typography>
                            </CardContent>
                            <CardActions
                                sx={{
                                    p: '0 4px 8px 4px',
                                }}
                            >
                                <Button startIcon={<GroupIcon />} size="small">
                                    20
                                </Button>
                                <Button startIcon={<ModeCommentIcon />} size="small">
                                    15
                                </Button>
                                <Button startIcon={<AttachmentIcon />} size="small">
                                    10
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>

                    <Box
                        sx={{
                            height: COLUMN_FOOTER_HEIGHT,
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button startIcon={<AddCardIcon />}>Add new card</Button>
                        <Tooltip title="Drag to move">
                            <DragHandleIcon sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default BoardContent;
