import { classNames } from 'src/shared/lib/classNames';
import cls from './MainPage.module.scss';
import { Typography } from '@mui/material';

interface MainPageProps {
  className?: string;
}

export default function MainPage({ className }: MainPageProps): JSX.Element {
  return (
    <section className={classNames(cls.mainpage, {}, [className])}>
      <Typography
        variant="h2"
        color="primary"
        fontWeight="bold"
        className={cls.offsetter}
      >
        MAIN PAGE!
      </Typography>
    </section>
  );
}
