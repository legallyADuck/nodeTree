export default {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};

// convert ESMAScript imports/exports into CJS for test