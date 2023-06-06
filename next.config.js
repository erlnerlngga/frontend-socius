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
    URL_API: "http://localhost:8080",
    WS_URL: "ws://localhost:8080",
    URL_THIS: "http://localhost:3000"
  }
}

module.exports = nextConfig
