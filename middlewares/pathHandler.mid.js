function pathHandler(req, res, next) {
    return res.json({
      statusCode: 404,
      message: `${req.method} ${req.url} endpoint no encontrado `,
    });
  }
  export default pathHandler;