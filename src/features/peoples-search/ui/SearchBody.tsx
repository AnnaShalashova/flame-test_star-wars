
import { List, Box } from "@mui/material"
import { PEOPLES_TEXT, Person } from "src/entities/peoples"
import { FetchStatus } from "src/shared/api"
import { ERROR_TEXTS } from "src/shared/constants"
import { Message } from "src/shared/ui/message"
import { ListItemLink } from "src/widgets/list-item-link"
import cls from './PeoplesSearch.module.scss'
import { Spinner } from "src/widgets/spinner"
import { observer } from "mobx-react-lite"

const ListStyles = {
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': { padding: 0 },
    '& a': { color: 'white', 'text-decoration': 'none' },
    '&::-webkit-scrollbar': { width: '5px' },
    '&::-webkit-scrollbar-track': {
        bgcolor: '#000',
        'border-radius': '20px',
    },
    '&::-webkit-scrollbar-thumb': {
        bgcolor: '#681991',
        'border-radius': '50px',
    }
}

interface SearchBodyProps {
    data: Person[],
    status: FetchStatus
}

export const SearchBody = observer(({ data, status }: SearchBodyProps) => {

    if (status === FetchStatus.ERROR) {
        return (
            <Message
                className={cls.texterror}
                text={ERROR_TEXTS.GENERAL_ERROR}
                error={true}
            />
        );
    }

    if (status === FetchStatus.LOADING) {
        return (
            <Box className={cls.centerer}>
                <Spinner />
            </Box>
        );
    }

    if (!data.length) {
        return <Message
            text={PEOPLES_TEXT.NO_PEOPLES_FOUND}
            className={cls.offsetter}
        />;
    }

    return (
        <List sx={ListStyles}>
            {data.map(item => (
                <ListItemLink to={`/peoples/${item.id}`} primary={item.name} />
            ))}
        </List>
    )
})