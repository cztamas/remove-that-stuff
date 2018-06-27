"use strict";

//const undoable = require("miraculous-undo");

(function() {
	let active = false;

	document.body.addEventListener("click", event => {
		const target = event.target;
		if(!active || !target) {
			return;
		}
		const parent = target.parentNode;
		if (!parent) {
			return;
		}
		const next = target.nextSibling;
		target.remove();

		const undo = () => {
			parent.insertBefore(target, next);
		};
		const redo = () => {
			target.remove();
		};
	});

	document.body.addEventListener("keypress", event => {
		if (event.key === "d") {
			active = true;
		}
	});

	document.body.addEventListener("keyup", event => {
		if (event.key === "d") {
			active = false;
		}
	});
}());