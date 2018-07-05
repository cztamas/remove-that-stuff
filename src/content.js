"use strict";

const undoable = require("miraculous-undo");

const selectedClassName = "remove-extension-selected";

(function() {
	let active = false;
	let selectedElement = null;

	document.addEventListener("click", event => {
		const target = event.target;
		if(!active || !target) {
			return;
		}
		const parent = target.parentNode;
		if (!parent || parent === document) {
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

		undoable.insert({
			undo,
			redo
		});
	}, true);

	document.addEventListener("keydown", event => {
		if (event.key === "d") {
			active = true;
			document.addEventListener("mousemove", selectItemUnderMouse);
			return;
		}
		if (event.key === "z" && event.ctrlKey) {
			undoable.undo();
			return;
		}
		if (event.key === "y" && event.ctrlKey) {
			undoable.redo();
			return;
		}
	}, true);

	document.addEventListener("keyup", event => {
		if (event.key === "d") {
			active = false;
			document.removeEventListener("mousemove", selectItemUnderMouse);
		}
		removeSelection();
	}, true);

	document.addEventListener("mouseover", event => {
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
		if (!element) {
			return;
		}
		selectedElement = element;
		element.classList.add(selectedClassName);
	}

	function selectItemUnderMouse(event) {
		let x = event.clientX;
		let y = event.clientY;
		let item = document.elementFromPoint(x, y);
		select(item);
		document.removeEventListener("mousemove", selectItemUnderMouse);
	}
}());