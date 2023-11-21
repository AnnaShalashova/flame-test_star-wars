import { classNames } from 'src/shared/lib/classNames/';
import cls from './PeoplesSearch.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Input, Paper } from '@mui/material';
import { useDebounce } from 'usehooks-ts';
import { useStore } from 'src/app/providers/store-provider/ui/StoreProvider';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { SearchBody } from './SearchBody';

interface PeoplesSearchProps {
  className?: string;
  handleFetchPeoples: (search: string) => void;
}

const PaperStyles = {
  'position': 'absolute',
  'width': '100%',
  'z-index': '10',
  'top': '100px',
  'padding': 2,

}

export const PeoplesSearch = observer(({
  className,
  handleFetchPeoples,
}: PeoplesSearchProps) => {
  const {
    relevantPeoples: relPeoplesProxy,
    search,
    searchUpdated,
    removeRelevantPeoples,
    status
  } = useStore(state => state.relevantPeoples)

  const [searchValue, setSearchValue] = useState<string>(search);
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const firstUpdate = useRef<boolean>(true);
  const relevantPeoples = toJS(relPeoplesProxy);

  useEffect(() => {
    // skip first useDebounce update
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (debouncedValue) {
      searchUpdated(debouncedValue);
      handleFetchPeoples(debouncedValue);
    } else {
      removeRelevantPeoples()
    }
  }, [debouncedValue, handleFetchPeoples, searchUpdated, removeRelevantPeoples]);

  useEffect(() => {
    return () => {
      setSearchValue('');
      searchUpdated('');
      removeRelevantPeoples();
    }
  }, [])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <section className={classNames(cls.peoplessearch, {}, [className])}>
      <Paper elevation={2} sx={{ padding: 3, width: '100%' }}>
        <Input
          sx={{ width: '100%', fontSize: '1.3em' }}
          value={searchValue}
          placeholder="type person name..."
          onChange={handleSearch}
        />

      </Paper>
      {debouncedValue ? (
        <Paper elevation={2} sx={PaperStyles}>
          <SearchBody data={relevantPeoples} status={status} />
        </Paper>) : null}
    </section >
  );
})
