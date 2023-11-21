import { classNames } from 'src/shared/lib/classNames';
import { CardMedia, CardMediaProps } from '@mui/material';
import { useState, useEffect, ReactNode } from 'react';
import cls from './LoadTrackableCardMedia.module.scss';

interface LoadTrackableCardMediaProps {
  className?: string;
  imageSrc: string;
  alt?: string;
  cardMediaProps: CardMediaProps;
  spinner?: ReactNode;
}

export function LoadTrackableCardMedia(
  props: LoadTrackableCardMediaProps
): JSX.Element {
  const { className, imageSrc, cardMediaProps, alt, spinner = null } = props;
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [, setImage] = useState({});
  const handleImageLoaded = () => {
    setImageIsLoading(false);
  };

  useEffect(() => {
    const image = new Image();
    image.onload = handleImageLoaded;
    image.src = imageSrc;
    setImage(image);
  }, []);

  return (
    <section
      className={classNames(cls.loadtrackablecardmedia, {}, [className])}
    >
      {!imageIsLoading ? (
        <CardMedia image={imageSrc} title={alt} {...cardMediaProps} />
      ) : (
        <>{spinner}</>
      )}
    </section>
  );
}
