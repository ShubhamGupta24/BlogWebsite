const validate = (schema) => async (req, res, next) => {
    try {
        // await schema.parseAsync(req.body) is the line where we use Zod to validate the request body data against the defined schema.
        const parseBody = await schema.parseAsync(req.body);
        console.log(parseBody)
        req.body = parseBody;
        return next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.issues.map((curElem) => curElem.message);

        console.log("dfdfghd", extraDetails)
        const error = {
            status,
            message,
            extraDetails,
        };

        next(extraDetails);
    }
};

module.exports = validate;

