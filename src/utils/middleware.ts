export const checkHasToken = (request: Request) => {
  if (request.headers.get("Authorization")) return true;
  return false;
};

export const checkContentType = (request: Request) => {
  if (request.headers.get("Content-Type") === "application/json") return true;
  return false;
};
