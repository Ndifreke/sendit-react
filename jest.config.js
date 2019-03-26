const path = require("path");
const React = require('react');
const Enzyme = require("enzyme");
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

module.exports = {
    rootDir: path.join(__dirname, "__tests__"),
    globals: {
        // fetch: async function () {
        //     return {
        //         json: async () => {
        //             return [{},{}];
        //         }
        //     }
        // },
        React,
        shallow,
        mount,
        Enzyme
    }
};
