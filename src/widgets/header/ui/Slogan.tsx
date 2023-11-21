import { classNames } from 'src/shared/lib/classNames';
import { useNavigate } from 'react-router-dom';
import cls from './Header.module.scss';

interface SloganProps {
  className?: string;
}

export function Slogan({ className }: SloganProps): JSX.Element {
  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  return (
    <section
      onClick={handleClick}
      className={classNames(cls.slogan, {}, [className])}
    >
      <span className={cls.star}>star</span>
      <div className={cls.vertical}></div>
      <span className={cls.wars}>wars</span>
    </section>
  );
}
