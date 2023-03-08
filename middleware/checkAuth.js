const checkAuth = (req, res, next) => {
    console.log('desde check .js');

    next()
}

export default checkAuth