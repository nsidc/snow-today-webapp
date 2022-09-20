import MockDate from 'mockdate';
import {getYear} from 'date-fns';

import {waterYearDay1, currentDowy} from '../waterYear';


test('Calculates water year day 1 in correct calendar year', () => {
  // Since the calendar year and water year are not synced, expect WYD1 to be
  // last year if today is before the water year start day.
  MockDate.set('2022-01-01');
  expect(getYear(waterYearDay1())).toEqual(2021);
});

test('Calculates October 5th as day 5 of the water year', () => {
  MockDate.set('2022-10-05');
  expect(currentDowy()).toEqual(5);
});

test('Calculates Jan 1st as day 93 of the water year', () => {
  MockDate.set('2022-01-01');
  expect(currentDowy()).toEqual(93);
});
