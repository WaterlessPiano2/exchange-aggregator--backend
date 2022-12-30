//TODO: If any of these are undefined, fail build, as that means the secrets are not being registered in the app.
export const config = () => ({
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET,
  mongoURI: process.env.MONGO_URI,
});
