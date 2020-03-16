import { showPopupAlert, showPopupAlertWithTitle } from '../utils/showAlert';
import { Localization } from '../utils/localization';
import { logout } from '../utils/utils_functions';

export const HTTP_STATUS_CODE = {
  SUCCESS_OK: 200,
  REDIRECTION: 300,
  CLIENT_ERROR: 400,
  SESSION_EXPIRE_ERROR: 401,
  SERVER_ERROR: 500,
};

export const METHOD_TYPE = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

export const isSuccessAPI = (apiResponse) => {
  if (apiResponse) {
    if (apiResponse.status
      && apiResponse.status >= HTTP_STATUS_CODE.SUCCESS_OK
      && apiResponse.status <= HTTP_STATUS_CODE.REDIRECTION) {
      return true;
    }
  }
  return false;
};

export const isInternalServerError = (apiResponse) => {
  if (apiResponse) {
    if (apiResponse.status && apiResponse.status >= HTTP_STATUS_CODE.SERVER_ERROR) {
      return true;
    }
  }
  return false;
};

export const isSessionTimeoutError = (apiResponse) => {
  if (apiResponse) {
    if (apiResponse.status && apiResponse.status === HTTP_STATUS_CODE.SESSION_EXPIRE_ERROR) {
      return true;
    }
  }
  return false;
};

const isJSON = (apiResponse) => {
  const contentType = apiResponse.headers.get('content-type');
  const isValid = contentType && contentType.indexOf('application/json') !== -1;
  return isValid;
};

export const parsedAPIResponse = (apiResponse) => {
  if (apiResponse) {
    const parsedResponse = isJSON(apiResponse) ? apiResponse.json() : apiResponse;
    if (parsedResponse) {
      return parsedResponse;
    }
  }
  return null;
};

export const isValidAPIResponse = (parsedResponse) => {
  if (parsedResponse
    && parsedResponse.message
    && typeof parsedResponse.message === 'string') {
    return true;
  }
  return false;
};

export const serverMessage = (parsedResponse) => {
  let parsedServerMessage = '';
  if (parsedResponse && parsedResponse.Message) {
    if (typeof parsedResponse.Message === 'string') {
      parsedServerMessage = parsedResponse.Message;
    } else if (typeof parsedResponse.Message === 'object') {
      for (let i = 0; i < parsedResponse.Message.length; i += 1) {
        if (i === parsedResponse.Message.length - 1) {
          parsedServerMessage += `${parsedResponse.Message[i]}`;
        } else {
          parsedServerMessage += `${parsedResponse.Message[i]}\n`;
        }
      }
    }
  }
  return parsedServerMessage;
};

export const showErrorMessage = (response, parsedResponse) => {
  let errorMessage = Localization.serverErrorMessage;
  if (isSessionTimeoutError(response)) {
    errorMessage = Localization.sessionErrorMessage;
    showPopupAlertWithTitle('Alert!', errorMessage, () => {
      logout();
    });
    return;
  }
  if (parsedResponse && (parsedResponse.GlobalError || parsedResponse.Message)) {
    showPopupAlert((parsedResponse.GlobalError || parsedResponse.Message));
    return;
  }
  if (isInternalServerError(response)) {
    errorMessage = Localization.internalServerErrorMessage;
  } else {
    const message = serverMessage(parsedResponse);
    if (message) {
      errorMessage = message;
    }
  }
  showPopupAlert(errorMessage);
};

export const showSuccessMessage = (parsedResponse, defaultMessage) => {
  let successMessage = defaultMessage;
  const message = serverMessage(parsedResponse);
  if (message) {
    successMessage = message;
  }
  showPopupAlert(successMessage);
};

export const showExceptionErrorMessage = () => {
  showPopupAlert(Localization.serverErrorMessage);
};
