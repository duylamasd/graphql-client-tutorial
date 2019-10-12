"use strict";

module.exports = {
  transform: {
    "^.+\\.tsx?$": "babel-jest",
    ".*": "babel-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^components(.*)$": "<rootDir>/src/components$1",
    "^views(.*)$": "<rootDir>/src/containers$1",
    "^root(.*)$": "<rootDir>/src$1"
  }
};
