export default function securityPlugin() {
  return {
    name: "vite-security-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        res.setHeader("X-XSS-Protection", "1; mode=block");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("Refferer-Policy", "strict-origin-when-cross-origin");
        res.setHeader("Permission-Policy", "fullscreen(self)");
        res.setHeader(
          "Strict-Transport-Security",
          "max-age=63072000; includeSubDomains; preload"
        );
        res.setHeader("HTTP-Cross-Origin-Opener-Policy", "same-origin");
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        res.setHeader("Cross-Origin-Resource-Policy", "same-site");
        res.setHeader("X-DNS-Prefetch-Control", "off");
        res.setHeader(
          "Content-Security-Policy",
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src *; img-src 'self' data:; object-src 'self';"
        );
        res.removeHeader("X-Powered-By");
        next();
      });
    },
  };
}
