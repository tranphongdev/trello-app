import { Card as MuiCard } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { Button, Typography } from '@mui/material'; // Added comma between Button and Typography

function Card() {
    return (
        <>
            <MuiCard
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
            </MuiCard>
        </>
    );
}

export default Card;
