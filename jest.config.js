const path = require('path');
const React = require('react');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { customEvent, fetch } = require('./mocks/index');

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

module.exports = {
  globals: {
    React,
    shallow,
    mount,
    Enzyme,
    customEvent,
    fetch
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@style(.*)$': '<rootDir>/src/asset/style$1',
    '^@common(.*)$': '<rootDir>/src/pages/common$1',
    '^@asset(.*)$': '<rootDir>/src/asset$1',
    '^@script(.*)$': '<rootDir>/src/asset/script$1',
    '^@src(.*)$': '<rootDir>/src$1',
    '^@redux(.*)$': '<rootDir>/src/redux$1'
  }
};
