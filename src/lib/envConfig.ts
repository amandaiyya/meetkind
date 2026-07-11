const envConfig = {
    mongodbURI: String(process.env.MONGODB_URI),
    resendApiKey: String(process.env.RESEND_API_KEY),
    baseUrl: String(process.env.BASE_URL),
    authSecret: String(process.env.AUTH_SECRET),
    tomtomApiKey: String(process.env.TOMTOM_API_KEY),
}

export default envConfig;