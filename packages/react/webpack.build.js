const merge = require('webpack-merge');
const baseConfig = require('../../webpack/webpack.build.base.js');

module.exports = merge(baseConfig, {
    output: {
        filename: "jsonforms-react.js",
        library: "JSONFormsReact"
      },
      externals: {
        '@1023-ventures/jsonforms-core': 'JSONFormsCore',
        "react": "React",
        "redux": "Redux",
        "react-redux": "ReactRedux"
    },
});