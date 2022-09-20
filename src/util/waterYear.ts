import {compareAsc, differenceInDays, getYear, getMonth, getDate} from 'date-fns';


export const waterYearDay1 = (): Date => {
  /* Calculate day 1 of the current water year.
   *
   * Day 1 of the current water year _may not_ lie within the current calendar year.
   * 
   * Water year is 1-indexed. Day 1 is October 1st.
   */
  const today = new Date();
  // October 1! Remember, JS months are 0-indexed!!!
  const thisYearWyd1 = new Date(getYear(today), 9, 1);

  let wyd1: Date;
  // The "water year" is not the same as a calendar year, so day 1 may be last year.
  // If "today" is less than this calendar year's water year day1, then the
  // current water year's day 1 was last calendar year.
  if (compareAsc(today, thisYearWyd1) === -1) {
    wyd1 = new Date(
      getYear(thisYearWyd1) - 1,
      getMonth(thisYearWyd1),
      getDate(thisYearWyd1),
    );
  } else {
    wyd1 = thisYearWyd1;
  }

  return wyd1;
}


// NOTE: Incremented to align with MATLAB convention of 1-indexed water year
export const currentDowy = (): number => differenceInDays(new Date(), waterYearDay1()) + 1;
