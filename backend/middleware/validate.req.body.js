const validateRequestBody = (validationSchema) => {
  return async (req, res, next) => {
    const data = req.body;

    try {
      const validatedData = await validationSchema.validate(data);
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    // console.log(req.body);
    // next(); //next() here will lead to the function passing on to the next middleware even if validation fails
  };
};

export default validateRequestBody;
