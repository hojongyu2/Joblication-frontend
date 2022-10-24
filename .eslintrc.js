module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    eqeqeq: "off",
    curly: "error",
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": "off",
    "react/self-closing-comp": "off",
    "react/jsx-no-constructed-context-values": "off",
    "react/no-array-index-key": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
