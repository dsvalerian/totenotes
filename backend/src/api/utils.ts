export const errorResponse = (message: string) => {
  return {
    error: message
  };
};

export const successResponse = (message: string) => {
  return {
    message: message
  };
};