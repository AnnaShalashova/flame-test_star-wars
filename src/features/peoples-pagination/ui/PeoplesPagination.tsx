import { Pagination } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { useStore } from 'src/app/providers/store-provider/ui/StoreProvider';
import { FetchStatus } from 'src/shared/api';

interface PeoplesPaginationProps {
  handleFetchPeoples: () => void;
}

export const PeoplesPagination = observer(({ handleFetchPeoples }: PeoplesPaginationProps) => {
  const peopleStore = useStore(state => state.peoples);
  const { currentPage, setCurrentPage, status, count } = peopleStore;
  const disabled = status === FetchStatus.LOADING;

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    handleFetchPeoples();
  };

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      sx={{ m: 4 }}
      count={count}
      color="primary"
      size="large"
      page={currentPage}
      onChange={handlePageChange}
      disabled={disabled}
    />
  );
})
