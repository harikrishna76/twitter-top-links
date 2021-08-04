export function handleErrors(error) {
  console.error(error);
  return null;
  // if (error) {
  //   console.error(error.response);
  //   if (error.response && error.response.data) {
  //     return error.response.data;
  //   }
  //   return { errors: { _message: error.message } };
  // }
  // console.error(error);
  // return { errors: { _message: 'Something went wrong! please try again' } };
}

export function handleResponse(response) {
  if (response.data) {
    console.log(response.data);
    return response.data;
  }
  console.log(response);
  return null;
}

export default {};
