const login=`
{{close}}
<h1>Log in</h1>
<div>
	<div class="selector">
		<form id="login_form" onsubmit="return globalThis.utils.login();">
			<div class="container">
				<label for="login" class="desc">User name</label>
				<input type="text" class="main_inputbox" placeholder="Enter Username" name="login" required>
				<br>
				<label for="password" class="desc">Password</label>
				<input type="password" class="main_inputbox" placeholder="Enter Password" name="password" required>
				<label for="password" class="err">Error</label>
				<br>
				<label><input type="checkbox" checked="checked" name="remember"> Remember me</label>
				<br><br>
				<button type="submit" class="main_button">Log in</button>
			</div>
		</form>
		<a href="#signup" style="text-align: center;">Sign up</a>
	</div>
</div>
`;

export default login;
