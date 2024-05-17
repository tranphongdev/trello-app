import Box from '@mui/material/Box';
import React from 'react';
import { Cloud, ContentCopy, ContentCut, ContentPaste, Opacity } from '@mui/icons-material';
import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListCards from './ListCards/ListCards';
import { mapOrder } from '~/utils/sorts';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Column({ column }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: { ...column },
    });

    const dndKitColumnStyle = {
        // touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const orderedCards = mapOrder(column?.cards, column.cardOrderIds, '_id');

    return (
        <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
            <Box
                {...listeners}
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
                {/* Column header */}
                <Box
                    sx={{
                        height: (theme) => theme.trello.columnHeaderHeight,
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
                        {column?.title}
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

                {/* List cart */}
                <ListCards cards={orderedCards} />

                {/* Column footer */}
                <Box
                    sx={{
                        height: (theme) => theme.trello.columnFooterHeight,
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
        </div>
    );
}

export default Column;
