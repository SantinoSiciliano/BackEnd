function propsProducts(req, res, next) {
    const { title, photo, price, stock } = req.body;
    if (!title || !photo || !price || !stock) {
      return res.json({
        statusCode: 400,
        message: `${req.method} ${req.url} se requieren título, foto, precio y stock `,
      });
    } else {
      return next();
    }
  }
  
  export default propsProducts;