type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  const classes = [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([, isActive]) => isActive)
      .map(([clazz]) => clazz),
  ];

  return classes.join(' ');
}
