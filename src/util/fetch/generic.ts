export const genericFetch = <Type>(
  url: string,
  errorMessageThing: string,
): Promise<Type> => {
  const failMsg = (errorMessage: string): string => (
    `Failed to fetch ${errorMessageThing} (${url}):\n  ${errorMessage}`
  );

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(failMsg(response.statusText));
      }
      return response.json() as Promise<Type>;
    })
    .catch((error) => {
      throw new Error(failMsg(String(error)));
    });
};
