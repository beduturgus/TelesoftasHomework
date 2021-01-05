module.exports = function(config) {
  config.set({
    mutator: "javascript",
    testRunner: "jest",
    packageManager: "npm",
    reporters: ["html", "clear-text", "progress"],
    coverageAnalysis: "off",
    mutate: ["src/*.js", "src/services/*.js", "!src/InputGenerator.js", "!src/item.js"],
  });
};