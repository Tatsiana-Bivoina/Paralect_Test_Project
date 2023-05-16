module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "import"
  ],
  extends: [
    "airbnb", 
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      }
    }
  ],
  env: {
    "es6": true,
    "browser": true,
    "node": true,
    "amd": true
  },
  rules: {
    "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    // "jsx-a11y/label-has-associated-control": ["error", {
    //   "required": {
    //     "some": ["nesting", "id"]
    //   }
    // }],
    // 'jsx-a11y/label-has-for': ['error', {
    //   'required': {
    //     'some': ['nesting', 'id']
    //   }
    // }]
  }
}
