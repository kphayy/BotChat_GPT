<!DOCTYPE html>
<html>
<head>
	<title>Trang đăng nhập</title>
</head>
<body>
	<h2>Đăng nhập</h2>
	<form action="process-login.php" method="POST">
		<label for="username">Tên đăng nhập:</label>
		<input type="text" id="username" name="username" required><br><br>
		
		<label for="password">Mật khẩu:</label>
		<input type="password" id="password" name="password" required><br><br>
		
		<input type="submit" value="Đăng nhập">
	</form>
</body>
</html>
