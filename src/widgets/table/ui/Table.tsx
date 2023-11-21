import { classNames } from "src/shared/lib/classNames";
import cls from './Table.module.scss';
import { Box, Paper, Table as TableMui, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { observer } from "mobx-react-lite";
import { PEOPLES_TEXT, Person } from "src/entities/peoples";
import { useNavigate } from "react-router-dom";
import { TableActionsType } from "src/shared/types/types";
import { ERROR_TEXTS } from "src/shared/constants";
import { FetchStatus } from "src/shared/api";
import { Message } from "src/shared/ui/message";
import { Spinner } from "src/widgets/spinner";
import { AppRoutes } from "src/shared/config/routeConfig";


interface TableProps {
    data: Person[],
    cellKeys: (keyof Person)[],
    columns: string[],
    className?: string,
    actions?: TableActionsType,
    status?: FetchStatus
}

export const Table = observer(({
    data,
    cellKeys,
    columns,
    className,
    actions,
    status
}: TableProps) => {
    const navigate = useNavigate();

    const tableRowStyles = {
        '&:last-child td, &:last-child th': { border: 0 },
        cursor: 'pointer',
        '&:hover': {
            'backgroundImage': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
        }
    }


    if (status === FetchStatus.ERROR) {
        return (
            <Message
                className={cls.offsetter}
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
        <section className={classNames(cls.peoplestable, {}, [className])}>
            <TableContainer component={Paper}>
                <TableMui sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell align="center" key={column}>{column}</TableCell>
                            ))}
                            {actions && <TableCell align="center">{actions.title}</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => {
                            return (
                                <TableRow
                                    key={item.name}
                                    sx={tableRowStyles}
                                    onClick={() => navigate(`/${AppRoutes.PEOPLES}/${item.id}`)}
                                >
                                    {cellKeys.map((key, idx) => (
                                        <TableCell key={idx} align="center">{item[key]}</TableCell>
                                    ))}
                                    {actions && actions.component(item)}
                                </TableRow >
                            )
                        })}
                    </TableBody>
                </TableMui>
            </TableContainer>
        </section>
    );

});