const errorResponse = (message) => {
    return { success: false, message };
}

const successResponse = (data) => {
    return { success: true, data };
}

module.exports = {
    errorResponse,
    successResponse,
}