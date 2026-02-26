import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Strict Transport Security (HSTS)
          // Enforces HTTPS for 2 years, including subdomains
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          
          // Content Security Policy (CSP)
          // Restricts resource loading to prevent XSS and data injection attacks
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          
          // X-Frame-Options (legacy support for older browsers)
          // Prevents clickjacking attacks
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          
          // X-Content-Type-Options
          // Prevents MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          
          // Referrer-Policy
          // Controls referrer information sent with requests
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          
          // Permissions-Policy
          // Controls which browser features can be used
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          
          // X-DNS-Prefetch-Control
          // Controls DNS prefetching
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
