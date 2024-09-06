interface WithSuccessResponse<Data> {
  status?: number;
  data: Data;
  message: string;
}
export const withSuccessResponse = <T>({
  status = 200,
  data,
  message,
}: WithSuccessResponse<T>) => {
  const response = {
    data,
    message,
  };
  return new Response(JSON.stringify(response), {
    status,
  });
};
