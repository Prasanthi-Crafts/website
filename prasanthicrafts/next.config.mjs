/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Add any experimental features if needed
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during builds as well
    ignoreDuringBuilds: true,
  },
  // Disable type checking completely for now
  compiler: {
    // Disable all type checking by disabling the compiler
    styledComponents: true, // Example: enable styled-components
  },
};

export default nextConfig; 