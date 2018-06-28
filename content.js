"use strict";

//const undoable = require("miraculous-undo");

const selectedClassName = "remove-extension-selected";

(function() {
	let active = false;
	let selectedElement = null;

	document.body.addEventListener("click", event => {
		console.log(event);
		const target = event.target;
		if(!active || !target) {
			return;
		}
		const parent = target.parentNode;
		if (!parent) {
			return;
		}
		event.preventDefault();
		event.stopImmediatePropagation();
		const next = target.nextSibling;
		target.remove();

		const undo = () => {
			parent.insertBefore(target, next);
		};
		const redo = () => {
			target.remove();
		};

		return false;
	}, true);

	document.body.addEventListener("keypress", event => {
		if (event.key === "d") {
			active = true;
			document.body.addEventListener("mousemove", selectItemUnderMouse);
		}
	});

	document.body.addEventListener("keyup", event => {
		if (event.key === "d") {
			active = false;
			document.body.removeEventListener("mousemove", selectItemUnderMouse);
		}
		removeSelection();
	});

	document.body.addEventListener("mouseover", event => {
		if (!active) {
			return;
		}
		removeSelection();
		select(event.target);
	});

	function removeSelection() {
		if (!selectedElement) {
			return;
		}
		selectedElement.classList.remove(selectedClassName);
		selectedElement = null;
	}

	function select(element) {
		selectedElement = element;
		element.classList.add(selectedClassName);
	}

	function selectItemUnderMouse(event) {
		let x = event.clientX;
		let y = event.clientY;
		let item = document.elementFromPoint(x, y);
		select(item);
		document.body.removeEventListener("mousemove", selectItemUnderMouse);
	}
}());