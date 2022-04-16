const PROXY_CONFIG = [
  {
    context: [
      "/api/**",
    ],
    target: "http://localhost:5000",
    secure: false,
  },
  {
    context: [
      "/**/api/**",
    ],
    target: "http://localhost:5000",
    secure: false,
  },
  {
    context: [
      "/static/**",
    ],
    target: "http://localhost:5000",
    secure: false,
  },
]

module.exports = PROXY_CONFIG;
