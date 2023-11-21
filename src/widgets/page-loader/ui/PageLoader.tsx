import { classNames } from 'src/shared/lib/classNames';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export function PageLoader({ className }: PageLoaderProps): JSX.Element {
  return (
    <div className={classNames(cls.pageloader, {}, [className])}>
      <div className={cls.spinnerOuter}>
        <div className={cls.spinnerInner}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
