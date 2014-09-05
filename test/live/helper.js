module.exports = {
	patterns: {
		url: /http:\/\/.*/,
		dwollaId: /[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
		checkoutId: /[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/,
		checkoutURL: /https:\/\/.*.dwolla.com\/payment\/checkout\/[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}/,
		ISOTimestamp: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\dZ/
	}
};