import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type Item = Record<string, unknown>;
enum Condition {
  e = 'e',
  ne = 'ne',
  lt = 'lt',
  lte = 'lte',
  gt = 'gt',
  gte = 'gte',
  default = '',
}

class Operations<T extends Item> {
  data: T[];
  params: URLSearchParams;
  allowFields: (keyof T)[];

  constructor(data: T[], params: URLSearchParams, allowFields?: (keyof T)[]) {
    this.data = data.slice();
    this.params = params;
    this.allowFields = allowFields ?? [];
  }

  sort() {
    if (!this.params.has('sort')) return this;
    const field = this.params.get('sort')?.replace('-', '');
    const by = this.params.get('sort')?.startsWith('-')
      ? 'descending'
      : 'ascending';

    this.data.sort((a, b) => {
      const va = a[field!];
      const vb = b[field!];

      switch (typeof va) {
        case 'string':
          if (typeof vb !== 'string') return 0;
          return by === 'ascending'
            ? va.localeCompare(vb)
            : vb.localeCompare(va);

        case 'number':
          if (typeof vb !== 'number') return 0;
          return by === 'ascending' ? va - vb : vb - va;

        default:
          return 0;
      }
    });

    return this;
  }

  filter() {
    const params = new URLSearchParams(this.params);
    params.delete('sort');

    params.forEach((value, key) => {
      const regex = /(\w+)(\[(e|ne|gt|lt|gte|lte)\])?/;
      const [, field, , con = ''] = regex.exec(key) ?? [];
      if (!this.allowFields.includes(field)) return;

      this.data = this.data.filter(item => {
        if (
          item[field] === undefined ||
          item[field] === null ||
          value === undefined ||
          value === null
        ) {
          return false;
        }

        switch (con) {
          case Condition.e:
          case Condition.default:
            return item[field] == value;

          case Condition.ne:
            return item[field] != value;

          case Condition.gt:
            return item[field] > value;

          case Condition.lt:
            return item[field] < value;

          case Condition.gte:
            return item[field] >= value;

          case Condition.lte:
            return item[field] <= value;
        }
      });
    });

    return this;
  }
}

function useQueryOperation<T extends Item>(
  data: T[] | undefined,
  allowFields?: Array<keyof T>,
) {
  const [searchParams] = useSearchParams();

  const cabins = useMemo(() => {
    if (!data || !searchParams.size) return data;
    const actions = new Operations(data, searchParams, allowFields);
    return actions.filter().sort().data;
  }, [data, searchParams, allowFields]);

  return cabins;
}

export { useQueryOperation };
