export const ENVIRONMENT = import.meta.env.PROD ? 'production' : 'development';
if (ENVIRONMENT === 'development') {
  console.debug(`Environment is: ${ENVIRONMENT}`);
}
