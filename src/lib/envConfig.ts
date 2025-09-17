const envConfig = {
    mongodbURI: String(process.env.MONGODB_URI),
    resendApiKey: String(process.env.RESEND_API_KEY),
}

export default envConfig;