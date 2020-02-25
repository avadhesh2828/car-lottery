import Environments from './environments.json';

const defaultEnvironment = 'staging';

// export const getBaseUrl = function () {
//   return defaultEnvironment === 'production' ? Environments['production'].BASE_URL : Environments['staging'].BASE_URL;
// };

export const getBaseUrl = function getBaseUrl() {
  switch (defaultEnvironment) {
    case 'local':
      return Environments.local.BASE_URL;
    case 'development':
      return Environments.development.BASE_URL;
    case 'staging':
      return Environments.staging.BASE_URL;
    case 'production':
      return Environments.production.BASE_URL;
    default:
      break;
  }
  return Environments.production.BASE_URL;
};
