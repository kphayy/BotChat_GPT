// Import các module và đối tượng cần thiết
const express = require('express');
const router = express.Router();

// Route GET /register
router.get('/register', (req, res) => {
  res.render('register'); // Render trang đăng ký tài khoản
});

// Route POST /register
router.post('/register', (req, res) => {
  const { username, password, email } = req.body; // Lấy thông tin đăng ký từ biểu mẫu

  // Kiểm tra thông tin đăng ký có hợp lệ hay không
  if (username && password && email) {
    // Thực hiện lưu thông tin tài khoản vào cơ sở dữ liệu
    // Ví dụ: User.create({ username, password, email }).then(() => { ... });

    res.redirect('/login'); // Chuyển hướng đến trang đăng nhập
  } else {
    res.render('register', { error: 'Vui lòng điền đầy đủ thông tin.' }); // Hiển thị thông báo lỗi
  }
});

module.exports = router;
