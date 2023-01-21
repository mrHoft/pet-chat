const signup=`
{{close}}
<h1>Sign up</h1>
<div>
	<div class="selector">
		<form action="#" method="post">
			<input type="text" class="main_inputbox" placeholder="First name*" name="first_name" required>
			<label for="first_name" class="err">Error</label>

			<input type="text" class="main_inputbox" placeholder="Second name" name="second_name">

			<input type="text" class="main_inputbox" placeholder="Login*" name="login" required>
			<label for="login" class="err">Error</label>

			<input type="text" class="main_inputbox" placeholder="E-mail*" name="email" required>
			<label for="email" class="err">Error</label>

			<input type="text" class="main_inputbox" placeholder="Phone" name="phone">

			<input type="password" class="main_inputbox" placeholder="Password*" name="password" required>
			<label for="password" class="err">Error</label>

			<input type="password" class="main_inputbox" placeholder="Password (repeat)*" name="psw-repeat" required>
			<label for="psw-repeat" class="err">Error</label>

			<!--<label><input type="checkbox" checked="checked" name="remember"> Remember me</label>-->
			<br><br>
			<button type="submit" class="main_button">Sign up</button>
		</form>
		<a href="/login" style="text-align: center;">Log in</a>
	</div>
</div>
`;

export default signup;
