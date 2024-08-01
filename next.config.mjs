/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
      // Füge hier weitere Hostnames hinzu, falls erforderlich
    ]
  },
  env: {
    CLERK_FRONTEND_API: process.env.CLERK_FRONTEND_API,
    MONGODB_URI: process.env.MONGODB_URI,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL // Sicherstellen, dass DATABASE_URL hinzugefügt ist
  },
  webpack: (config) => {
    // Eventuell weitere Anpassungen am Webpack-Config
    return config;
  }
};

export default nextConfig;