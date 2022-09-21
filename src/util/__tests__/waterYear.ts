import MockDate from 'mockdate';
import {getYear} from 'date-fns';

import {
  currentDowy,
  unixDateFromDowy,
  waterYearDay1,
} from '../waterYear';


test('Calculates water year day 1 in correct calendar year', () => {
  // Since the calendar year and water year are not synced, expect WYD1 to be
  // last year if today is before the water year start day.
  MockDate.set('2022-01-01');
  // We have to clear the cache to support different mocked dates:
  waterYearDay1.cache.clear!();
  expect(getYear(waterYearDay1())).toEqual(2021);
});

test('Calculates October 5th as day 5 of the water year', () => {
  MockDate.set('2022-10-05');
  waterYearDay1.cache.clear!();
  currentDowy.cache.clear!();
  expect(currentDowy()).toEqual(5);
});

test('Calculates Jan 1st as day 93 of the water year', () => {
  MockDate.set('2022-01-01');
  waterYearDay1.cache.clear!();
  currentDowy.cache.clear!();
  expect(currentDowy()).toEqual(93);
});

test('Calculates DOWY 93 as Jan 1st', () => {
  // Mock the date because the "current" water year will change over time in a
  // way that doesn't sync with calendar year, so we can't use the current year
  // in the test.
  MockDate.set('2022-01-01!');

  waterYearDay1.cache.clear!();
  currentDowy.cache.clear!();
  expect(unixDateFromDowy(93)).toEqual(Date.UTC(2022, 0, 1));
});
