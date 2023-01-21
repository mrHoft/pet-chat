export default `
{{close}}
<h1>Change password</h1>
<div>
	<div class="selector">
		<form id="password_form" onsubmit="return false;">
			<input type="password" class="main_inputbox" placeholder="Password*" name="password" required>
			<label for="password" class="err">Error</label>

			<input type="password" class="main_inputbox" placeholder="Repeat password*" name="psw-repeat" required>
			<label for="psw-repeat" class="err">Error</label>
			<br>
			<br>
			<button type="submit" class="main_button">Change</button>
		</form>
	</div>
</div>
`;
