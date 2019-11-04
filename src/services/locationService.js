export function getCurrentLocation() {
	var options = {
	  enableHighAccuracy: false,
	  timeout: 5000,
	  maximumAge: 0
	}

	try {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, options);
		});
	} catch (ex) {
		console.log("Browser does not support Geolocation.", ex);
	}
}