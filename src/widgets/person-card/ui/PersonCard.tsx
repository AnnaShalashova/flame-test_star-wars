import { Grid, Card, Box, List, ListItem, ListItemText, CardContent, Button } from '@mui/material';
import cls from './PersonCard.module.scss';
import { FetchStatus } from 'src/shared/api';
import { Spinner } from 'src/widgets/spinner';
import { Message } from 'src/shared/ui/message';
import { ERROR_TEXTS } from 'src/shared/constants';
import { PEOPLES_TEXT, Person } from 'src/entities/peoples';
import { LoadTrackableCardMedia } from 'src/shared/ui/load-trackable-image';
import { observer } from 'mobx-react-lite';
import { PageLoader } from 'src/widgets/page-loader';
import { isPersonFavorite } from 'src/entities/peoples/api/helpers';

interface PersonCardProps {
  className?: string;
  status: FetchStatus;
  person: Person | null,
  favorites: Person[] | null,
  toggleFavorites: (person: Person) => void
}

const KEYS_IGNORED = [
  'id',
  'image'
]

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ListStyles = {
  width: '100%',
  maxWidth: 360,
  overflow: 'auto',
  maxHeight: 400,
  '& ul': { padding: 0 },
  '& a': { color: 'white', textDecoration: 'none' },
  '&::-webkit-scrollbar': { width: '5px' },
  '&::-webkit-scrollbar-track': {
    bgcolor: '#000',
    borderRadius: '20px',
  },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: '#681991',
    borderRadius: '50px',
  }
}

const cardMediaProps = {
  sx: { height: 535, width: 350, objectFit: 'cover' },
};

export const PersonCard = observer((
  { person, status, favorites, toggleFavorites }: PersonCardProps) => {

  if (status === FetchStatus.LOADING) {
    return (
      <Box className={cls.centerer}>
        <PageLoader />
      </Box>
    );
  }

  if (status === FetchStatus.ERROR) {
    return <Message text={ERROR_TEXTS.GENERAL_ERROR} error={true} />;
  }

  if (!person) {
    return <Message text={PEOPLES_TEXT.NO_PEOPLES_FOUND} />;
  }

  const { name, image } = person;
  const btnText = isPersonFavorite(person, favorites) ? 'Remove' : 'Add' + ' favorite';

  return (
    <Grid
      sx={gridStyles}
      container
      spacing={3}
      maxWidth={900}
      columns={{ xs: 12, md: 6, lg: 4 }}
    >
      <Grid>
        <Card sx={{ width: 350, height: 480 }}>
          <LoadTrackableCardMedia
            imageSrc={image}
            alt={name}
            cardMediaProps={cardMediaProps}
            spinner={<Spinner className={cls.centerer} />}
          />
        </Card>
      </Grid>
      <Grid>
        <Card sx={{ width: 400, height: 480 }}>
          <CardContent>
            <List sx={ListStyles} >
              {Object.keys(person).map(key => {
                if (KEYS_IGNORED.includes(key)) return;
                return (
                  <ListItem key={key}>
                    <ListItemText primary={person[key as keyof Person]} secondary={key} />
                  </ListItem>
                )
              })}
            </List>
            {(
              <Button
                sx={{ mt: 2, ml: 0.6 }}
                color="warning"
                type="button"
                size="large"
                onClick={() => toggleFavorites(person)}
              >
                {btnText}
              </Button>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid >
  );
})
