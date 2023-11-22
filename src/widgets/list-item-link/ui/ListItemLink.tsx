import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

interface ListItemLinkProps {
    primary: string;
    to: string;
    id: number
}

const ListItemStyles = {
    '&:hover': {
        'outline': '1px solid #cc50da42'
    }
}

export function ListItemLink(props: ListItemLinkProps) {
    const { primary, to, id } = props;

    return (
        <Link to={to}>
            <ListItem sx={ListItemStyles} key={id}>
                <ListItemText primary={primary} />
            </ListItem>
        </Link>
    );
}