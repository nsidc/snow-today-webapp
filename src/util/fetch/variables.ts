import {cogsIndexUrl} from '../../constants/dataServer';


export const fetchVariablesIndex = (): Promise<any> => {
  return fetch(cogsIndexUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch index of variable data: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {console.error(error)});
};
