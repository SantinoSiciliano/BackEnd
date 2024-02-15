function notFoundOne(model, one) {
    if (!one) {
      const error = new Error(`${model.modelName} not found`);
      error.statusCode = 404;
      throw error;
    }
    return one;
  }
  
  export default notFoundOne;