// const asyncHandler = () => { ()=>{} };
// const asyncHandler = (fn) => async (request, response, next) => {
//   try {
//     await fn(request, response, next);
//   } catch (error) {
//     response.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// same code with promises to make it easy to understand
const asyncHandler = (requestHandler) => {
  (request, response, next) => {
    Promise.resolve(requestHandler(request, response, next)).catch((error) =>
      next(error)
    );
  };
};

export default asyncHandler;
