// Import các module và đối tượng cần thiết
const express = require('express');
const router = express.Router();

// Route GET /login
router.get('/login', (req, res) => {
  res.render('login'); // Render trang đăng nhập
});

// Route POST /login
router.post('/login', (req, res) => {
  const { username, password } = req.body; // Lấy thông tin đăng nhập từ biểu mẫu

  // Kiểm tra tên đăng nhập và mật khẩu có hợp lệ hay không
  if (username === 'admin' && password === '123456') {
    req.session.user = { username }; // Lưu thông tin người dùng vào session
    res.redirect('/'); // Chuyển hướng đến trang chủ
  } else {
    res.render('login', { error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' }); // Hiển thị thông báo lỗi
  }
});

// Route GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy(); // Xóa thông tin người dùng khỏi session
  res.redirect('/login'); // Chuyển hướng đến trang đăng nhập
});

module.exports = router;
