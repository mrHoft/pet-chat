function MoreButton(options) {
	// console.log('more: ',options);
	let onclick=options?.onclick ? options?.onclick : "location.href='#'";
	return (`<div><button class="more_button" onclick="${onclick}">⁞</button></div>\n`);
}

export default MoreButton;
