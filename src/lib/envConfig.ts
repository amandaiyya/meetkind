const envConfig = {
    mongodbURI: String(process.env.MONGODB_URI),
    resendApiKey: String(process.env.RESEND_API_KEY),
    baseUrl: String(process.env.BASE_URL),
}

export default envConfig;