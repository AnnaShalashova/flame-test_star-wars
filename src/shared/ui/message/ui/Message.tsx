import { classNames } from 'src/shared/lib/classNames';
import cls from './Message.module.scss';
import { Typography } from '@mui/material';

interface MessageProps {
  className?: string;
  error?: boolean;
  text: string;
}

export function Message({
  className,
  text,
  error = false,
}: MessageProps): JSX.Element {
  return (
    <section className={classNames(cls.message, {}, [className])}>
      <Typography
        variant="h4"
        color={error ? 'error' : 'primary'}
        align="center"
      >
        {text}
      </Typography>
    </section>
  );
}
