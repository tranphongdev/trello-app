import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { Button, Typography } from '@mui/material'; // Added comma between Button and Typography

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Card({ card }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: card._id,
        data: { ...card },
    });

    const dndKitCardStyle = {
        touchAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid #0984e3' : undefined,
    };

    const shouldShowCardActions = () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length;
    };
    return (
        <>
            <MuiCard
                ref={setNodeRef}
                style={dndKitCardStyle}
                {...attributes}
                {...listeners}
                sx={{
                    cursor: 'pointer',
                    boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset',
                    display: card?.FE_PlaceholderCard ? 'none' : 'block',
                }}
            >
                {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}

                <CardContent
                    sx={{
                        p: 1.5,
                        '&: last-child': { p: 1.5 },
                    }}
                >
                    <Typography>{card?.title}</Typography>
                </CardContent>
                {shouldShowCardActions() && (
                    <CardActions
                        sx={{
                            p: '0 4px 8px 4px',
                        }}
                    >
                        {!!card?.memberIds?.length && (
                            <Button startIcon={<GroupIcon />} size="small">
                                {card?.memberIds?.length}
                            </Button>
                        )}
                        {!!card?.comments?.length && (
                            <Button startIcon={<ModeCommentIcon />} size="small">
                                {card?.comments?.length}
                            </Button>
                        )}
                        {!!card?.attachments?.length && (
                            <Button startIcon={<AttachmentIcon />} size="small">
                                {card?.attachments?.length}
                            </Button>
                        )}
                    </CardActions>
                )}
            </MuiCard>
        </>
    );
}

export default Card;
