function propsOrders(req, res, next) {
    const { quantity, state } = req.body;
    if (!quantity || !state) {
      return res.json({
        statusCode: 400,
        message: `${req.method} ${req.url} se requieren cantidad y estado `,
      });
    } else {
      return next();
    }
  }
  
  export default propsOrders;