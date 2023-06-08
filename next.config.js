/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      }
    ]
  },
  env: {
    URL_IMAGE_UPLOAD: "https://api.cloudinary.com/v1_1/dzdlnbckj/image/upload",
    URL_API: "https://backend-socius-production.up.railway.app",
    WS_URL: "wss://backend-socius-production.up.railway.app",
    URL_THIS: "http://localhost:3000"
  }
}

module.exports = nextConfig
