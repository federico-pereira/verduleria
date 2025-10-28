// karma.conf.js
const path = require('path');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // 🔒 Ejecuta sólo tests *.spec.jsx dentro de src/components
    files: [
      'src/components/**/*.spec.jsx',
    ],

    preprocessors: {
      'src/components/**/*.spec.jsx': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                // Transpila JSX y JS moderno
                presets: [
                  ['@babel/preset-env', { bugfixes: true }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // Instrumenta SOLO Carrito.jsx y Login.jsx
                plugins: [
                  ['istanbul', {
                    include: [
                      'src/components/Carrito.jsx',
                      'src/components/Login.jsx',
                    ],
                    exclude: [
                      '**/*.spec.jsx',
                    ],
                  }],
                ],
              },
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
      ],
      // ✅ Umbrales globales que te pidió tu profe
      check: {
        global: {
          statements: 80,
          branches: 50,
          functions: 80,
          lines: 80,
        },
      },
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
