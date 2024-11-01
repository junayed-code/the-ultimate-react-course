import type { Interpolation } from 'styled-components';

type Variant = Record<string, Record<string, Interpolation<object>>>;

type Props<V extends Variant> = { [R in keyof V]?: keyof V[R] };

export type VariantProps<Picker extends ReturnType<typeof createVariant>> =
  Parameters<Picker>[0];

export function createVariant<V extends Variant>(variants: V) {
  return function (props: Props<V>) {
    return Object.entries(props)
      .map(([key, variant]) => {
        return variants[key][variant as string];
      })
      .filter(Boolean)
      .flat();
  };
}
