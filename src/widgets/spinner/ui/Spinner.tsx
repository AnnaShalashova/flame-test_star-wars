import { classNames } from 'src/shared/lib/classNames';
import PlanetLoader from './page-loader.svg';
import cls from './Spinner.module.scss';

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps): JSX.Element {
  return (
    <div className={classNames(cls.spinner, {}, [className])}>
      <img src={PlanetLoader} alt="planet spinner" />
    </div>
  );
}
