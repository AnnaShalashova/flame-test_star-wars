import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface ListItemLinkProps {
    primary: string;
    to: string;
}

const ListItemStyles = {
    '&:hover': {
        'outline': '1px solid #cc50da42'
    }
}

export function ListItemLink(props: ListItemLinkProps) {
    const { primary, to } = props;

    return (
        <Link to={to}>
            <ListItem sx={ListItemStyles}>
                <ListItemText primary={primary} />
            </ListItem>
        </Link>
    );
}