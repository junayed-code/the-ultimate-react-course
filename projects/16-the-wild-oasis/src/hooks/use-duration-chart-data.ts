import { useMemo } from 'react';
import { useTheme } from '@features/theme/context';
import { useBookingStatistics } from '@hooks/bookings';

const durationTags = [
  '1 night',
  '2 nights',
  '3 nights',
  '4-5 nights',
  '6-7 nights',
  '8-14 nights',
  '15-20 nights',
  '20+ nights',
];
const colorsForLight = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#a855f7',
];
const colorsForDark = [
  '#b91c1c',
  '#c2410c',
  '#a16207',
  '#4d7c0f',
  '#15803d',
  '#0f766e',
  '#1d4ed8',
  '#7e22ce',
];

/**
 * It takes a duration tag and a value as parameters and checks if the value
 * matches the duration tag group.
 */
function isSameGroupOfDuration(tag: string, value: number) {
  const groups = (/^(?<value>\d+(-\d+|\+)?) nights?$/.exec(tag)?.groups ?? {
    value: '',
  }) as { value: string };

  const isNumber = !isNaN(+groups.value);
  const isRangeValue = groups.value.includes('-');
  const isAboveRangeValue = groups.value.endsWith('+');

  if (isNumber) {
    return Number(groups.value) === value;
  } else if (isRangeValue) {
    const [start, end] = groups.value.split('-').map(Number);
    return start <= value && end >= value;
  } else if (isAboveRangeValue) {
    return parseInt(groups.value) <= value;
  } else {
    return false;
  }
}

function prepareData(entries: Array<{ nights: number }>) {
  return durationTags
    .map(durationTag => {
      // Count total nights for each duration tag
      const value = entries.reduce(
        (accumulator, entry) =>
          isSameGroupOfDuration(durationTag, entry.nights)
            ? accumulator + 1
            : accumulator,
        0,
      );
      return { durationTag, value };
    })
    .filter(entry => Boolean(entry.value));
}

/**
 * It prepare the bookings data to be used in a pie chart to show how many
 * nights guests stay.
 */
export function useDurationChartData() {
  const { theme } = useTheme();
  const { statistics } = useBookingStatistics();
  // Compute data for chart
  const data = useMemo(
    function () {
      return statistics && prepareData(statistics.confirmedBookings);
    },
    [statistics],
  );
  // Compute colors for chart
  const colors = useMemo(
    function () {
      const colorsOnTheme = theme === 'dark' ? colorsForDark : colorsForLight;
      return data?.map(
        ({ durationTag }) => colorsOnTheme[durationTags.indexOf(durationTag)],
      );
    },
    [data, theme],
  );

  return { data, colors };
}
