const ownerMiddleware = (req, res, next) => {
    if (
        req.user.role !== "owner" ||
        req.user.ownerStatus !== "approved"
    ) {
        return res.status(403).json({
            success: false,
            message: "Access denied. Approved owners only."
        });
    }

    next();
};

export default ownerMiddleware;