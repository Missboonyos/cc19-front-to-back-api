const handleErrors = (err, req, res, next) => {
    //code
    console.log("Step3 handle Error");
    res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something Wrong!!!" });
};

module.exports = handleErrors;