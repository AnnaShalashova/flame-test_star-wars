import { classNames } from 'src/shared/lib/classNames';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import cls from './PeoplesPage.module.scss';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Table } from 'src/widgets/table';
import { toJS } from 'mobx';
import { TableActionsType } from 'src/shared/types/types';
import { Person } from 'src/entities/peoples';
import { Button, TableCell } from '@mui/material';
import { useStore } from 'src/app/providers/store-provider/ui/StoreProvider';
import { PeoplesPagination } from 'src/features/peoples-pagination/ui/PeoplesPagination';
import { PeoplesSearch } from 'src/features/peoples-search';
import { isPersonFavorite } from 'src/entities/peoples/api/helpers';

interface PeoplesPageProps {
  className?: string;
}

const PeoplesPage = observer((props: PeoplesPageProps) => {
  const { className } = props;
  const peoplesStore = useStore((state) => state.peoples);
  const { fetchRelevantPeoples } = useStore((state) => state.relevantPeoples);
  const { peoples: peoplesProxy, columns, cellKeys,
    toggleFavorites, status, fetchPeoples, favorites: favoritesProxy } = peoplesStore;
  const peoples: Person[] = toJS(peoplesProxy);
  const favorites: Person[] = toJS(favoritesProxy);


  const actions: TableActionsType = {
    title: 'Add/remove favorites',
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
          {isPersonFavorite(person, favorites) ? (
            <GradeIcon color="primary" />
          ) : (
            <GradeOutlinedIcon color="primary" />
          )}
        </Button>
      </TableCell>
    )
  }

  const handleFetchRelevantPeoples = () => {
    fetchRelevantPeoples();
  }

  useEffect(() => {
    if (!peoples.length) {
      fetchPeoples();
    }

    // cancel request here if need it
  }, []);

  return (
    <section className={classNames(cls.peoplespage, {}, [className])}>
      <PeoplesSearch handleFetchPeoples={handleFetchRelevantPeoples} />
      <PeoplesPagination handleFetchPeoples={fetchPeoples} />
      <Table
        data={peoples}
        columns={columns}
        cellKeys={cellKeys}
        actions={actions}
        status={status}
      />
    </section>
  );
})

export default PeoplesPage;
