type TagVariant = 'default' | 'primary' | 'secondary';

const tagVariantsByStatus: [string, TagVariant][] = [
  ['unconfirmed', 'default'],
  ['checked-in', 'primary'],
  ['checked-out', 'secondary'],
];

export function pickTagVariant(status: string) {
  const [, variant] = tagVariantsByStatus.find(
    ([_status]) => _status === status,
  ) ?? ['', 'default'];
  return variant;
}
