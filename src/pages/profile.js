const profile=`
{{close}}
<h1>Profile</h1>

<form action="#" method="post">
	<div class="profile_inner">
		<div class="selector">
			<input type="text" class="main_inputbox" placeholder="First name" name="first_name" required>
			<label for="first_name" class="err">Error</label>

			<input type="text" class="main_inputbox" placeholder="Second name" name="second_name">

			<input type="text" class="main_inputbox" placeholder="Display name" name="display_name" required>
			<label for="display_name" class="err">Error</label>

			<input type="text" class="main_inputbox" placeholder="Login" name="login" required>
			<label for="login" class="err">Error</label>

			<input type="text" class="main_inputbox" placeholder="E-mail" name="email" required>
			<label for="email" class="err">Error</label>

			<input type="text" class="main_inputbox" placeholder="Phone" name="phone">
		</div>
		<div>
			<div class="avatar"></div>
			<p class="err" style="text-align: center;">Error</p>
		</div>
	</div>
	<br><br>
	<div class="selector">
		<button type="submit" class="main_button">Update</button>
		<a href="#password_change" style="text-align: center;">Change password</a>
	</div>
</form>

<div class="desc" style="margin-left: 5%">
* For the reviewer:<br>
* This page allows to see and change user profile.<br>
* Fields are filled by profile details. Update button checks new data and sends update profile request.<br>
* I think this way little bit harder but more useble.
</div>
`;

export default profile;
