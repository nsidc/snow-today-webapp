import {swePointsUrl} from '../../constants/dataServer';
import {SwePoints} from '../../types/query/swe';


export const fetchSwePoints = (): Promise<SwePoints> => {
  return fetch(swePointsUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch swe points data: ${response.statusText}`);
      }
      return response.json() as Promise<SwePoints>;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch swe points data: ${String(error)}`);
    });
};
