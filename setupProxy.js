const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	// app.use(
	// 	proxy( "https://ola-dreamboard-dev1.herokuapp.com", {
	// 		target: "https://ola-dreamboard-dev1.s3.us-east-2.amazonaws.com",
	// 		changeOrigin: true
	// 	})
	// );

	app.use(
		proxy( "/api/section", {
			target: "http://localhost:3000",
			changeOrigin: true
		})
	);
}