/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
    prependData: `@import "./base.scss";`,
  },
};

export default nextConfig;
