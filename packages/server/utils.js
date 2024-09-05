export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Create http error with status code and error message
 * @param {number} status
 * @param {string} message
 * @returns {Error}
 */
export const createHttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
