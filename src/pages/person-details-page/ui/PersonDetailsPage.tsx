import { classNames } from 'src/shared/lib/classNames';
import cls from './PersonDetailsPage.module.scss';
import { useStore } from 'src/app/providers/store-provider/ui/StoreProvider';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { PersonCard } from 'src/widgets/person-card';
import { useParams } from 'react-router-dom';

interface PersonDetailsPageProps {
  className?: string;
}

const PersonDetailsPage = observer(({
  className
}: PersonDetailsPageProps) => {
  const { id } = useParams();
  const { person: personProxy, fetchPerson, status } = useStore(state => state.person);
  const { favorites: favoritesProxy, toggleFavorites } = useStore(state => state.peoples);
  const person = toJS(personProxy);
  const favorites = toJS(favoritesProxy);

  useEffect(() => {
    fetchPerson(Number(id));
  }, [])

  return (
    <section className={classNames(cls.persondetailspage, {}, [className])}>
      <PersonCard person={person} status={status}
        favorites={favorites} toggleFavorites={toggleFavorites} />
    </section>
  );
})

export default PersonDetailsPage;
