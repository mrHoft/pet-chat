function MoreButton(options) {
	// console.log('more: ',options);
	let onclick=options?.onclick ? options?.onclick : "location.href='/'";
	return (`<button class="more_button" onclick="${onclick}">&#9776</button>\n`);
}

export default MoreButton;
