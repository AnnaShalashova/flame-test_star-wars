import { Pagination } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { useStore } from 'src/app/providers/store-provider/ui/StoreProvider';
import { FetchStatus } from 'src/shared/api';

interface PeoplesPaginationProps {
  handleFetchPeoples: (page: number) => void;
}

export const PeoplesPagination = observer(({ handleFetchPeoples }: PeoplesPaginationProps) => {
  const peopleStore = useStore(state => state.peoples);
  const { currentPage, status, count } = peopleStore;
  const [page, setPage] = useState(currentPage)
  const disabled = status === FetchStatus.LOADING;

  const [resolvedCount] = useState(Math.ceil(count! / 10));

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
    handleFetchPeoples(page);
  };

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      sx={{ m: 4 }}
      count={resolvedCount}
      color="primary"
      size="large"
      page={page}
      onChange={handlePageChange}
      disabled={disabled}
    />
  );
})
