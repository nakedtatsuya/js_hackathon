module.exports = {
	preset: "jest-puppeteer",

	globals: {
		FRONT_PORT: process.env.FRONT_PORT || 3001,
		BACKEND_PORT: process.env.BACKEND_PORT || 8001,
	},
	watchman: false,
};
