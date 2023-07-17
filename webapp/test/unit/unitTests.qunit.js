/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"territory1/northwindterritoryproject/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
