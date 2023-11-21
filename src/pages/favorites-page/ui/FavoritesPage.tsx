import { classNames } from 'src/shared/lib/classNames';
import cls from './FavoritesPage.module.scss';
import { Table } from 'src/widgets/table';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Person } from 'src/entities/peoples';
import { TableActionsType } from 'src/shared/types/types';
import { Button, TableCell } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useStore } from 'src/app/providers/store-provider/ui/StoreProvider';

interface FavoritesPageProps {
    className?: string;
}

const FavoritesPage = observer(({ className }: FavoritesPageProps) => {
    const peoplesStore = useStore((state) => state.peoples);
    const { favorites: favoritesProxy, columns, cellKeys, toggleFavorites } = peoplesStore;
    const favorites: Person[] = toJS(favoritesProxy);

    const actions: TableActionsType = {
        title: 'Delete',
        component: (person: Person) => (
            <TableCell align="center">
                <Button
                    type="button"
                    size="large"
                    color="warning"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorites(person)
                    }}
                >
                    <DeleteOutlineIcon color="primary" />
                </Button>
            </TableCell>
        )
    }

    return (
        <section className={classNames(cls.favoritespage, {}, [className])}>
            <Table
                data={favorites}
                actions={actions}
                columns={columns}
                cellKeys={cellKeys}
            />
        </section>
    );
})

export default FavoritesPage;
