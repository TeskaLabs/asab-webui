/**
 * This function serves to initialize the Philbert's dropdowns
 * to be compatible with React. The content was taken from
 * /public/media/philbert/js/dropdown-bootstrap-extended.js
 */
function initPhilbertDropdownEffectors() {
	if (!window.$) {
		console.error("window.$ is not available. Aborting initPhilbertDropdownEffectors.");
		return;
	}
	var dropdownSelectors = window.$('.dropdown, .dropup');
	dropdownSelectors.unbind("show.bs.dropdown");
	dropdownSelectors.unbind("shown.bs.dropdown");
	dropdownSelectors.unbind("hide.bs.dropdown");
	dropdownSelectors.on({
		"show.bs.dropdown": function () {
		// On show, start in effect
		var dropdown = window.dropdownEffectData(this);
		window.dropdownEffectStart(dropdown, dropdown.effectIn);
		},
		"shown.bs.dropdown": function () {
		// On shown, remove in effect once complete
		var dropdown = window.dropdownEffectData(this);
		if (dropdown.effectIn && dropdown.effectOut) {
			window.dropdownEffectEnd(dropdown, function() {});
		}
		},
		"hide.bs.dropdown":  function(e) {
		// On hide, start out effect
		var dropdown = window.dropdownEffectData(this);
		if (dropdown.effectOut) {
			e.preventDefault();
			window.dropdownEffectStart(dropdown, dropdown.effectOut);
			window.dropdownEffectEnd(dropdown, function() {
			dropdown.dropdown.removeClass('open');
			});
		}
		},
	});
};
export {
	initPhilbertDropdownEffectors
}
