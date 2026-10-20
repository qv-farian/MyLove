# 🌸 Hiệu Ứng Trái Tim & Lời Chúc 20/10 💖

Một ứng dụng web gửi lời chúc **Ngày Phụ Nữ Việt Nam (20/10)** đầy lãng mạn, kết hợp hiệu ứng đồ họa **Canvas 2D**, **Web Audio API** khuếch đại âm lượng, và giao diện **Glassmorphism** hiện đại bằng Tailwind CSS.

![Project Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

---

## ✨ Tính Năng Nổi Bật

* **Hiệu Ứng Trái Tim Thuật Toán (Math Heart Shape):** Các câu chúc yêu thương đa ngôn ngữ (*Anh yêu em, I love you, Je t'aime, 我爱你...*) tự động bay vào ghép thành hình trái tim.
* **Tương Tác Di Chuột (Hover Dynamic Glow):** Khi di chuột qua các dòng chữ, hiệu ứng phát sáng hồng sẽ phản hồi theo vị trí con trỏ.
* **Âm Thanh Tự Phát:** Tự động phát `audio.mp3` khi mở trang; nếu trình duyệt chặn autoplay, âm thanh sẽ phát lại ngay khi người dùng tương tác lần đầu.
* **Giao Diện Glassmorphism Hiện Đại:** Sử dụng hiệu ứng kính mờ, phối màu nền tối quyến rũ và bong bóng sáng dịu nhẹ.
* **Thiệp Lời Chúc Tùy Chỉnh (Modal Card):** Pop-up thiệp mừng rực rỡ kèm lời chúc ý nghĩa, có thể mở lại bất cứ lúc nào.
* **Responsive 100%:** Hiển thị mượt mà trên mọi kích thước màn hình từ điện thoại đến máy tính.

---

## 🛠️ Công Nghệ Sử Dụng

* **HTML5 Canvas 2D:** Xử lý hiệu ứng hạt và vẽ trái tim bằng công thức toán học.
* **Vanilla JavaScript (ES6+):** Xử lý logic hoạt ảnh, sự kiện tương tác và thuật toán phân bổ văn bản.
* **Web Audio API:** Xử lý và khuếch đại âm thanh nền/hiệu ứng.
* **Tailwind CSS:** Dùng CDN cho việc dựng giao diện nhanh chóng.
* **FontAwesome & Google Fonts:** Font chữ sáng tạo *Dancing Script* & *Montserrat* cùng bộ icon phong phú.

---

## 📂 Cấu Trúc Thư Mục

```text
├── index.html       # File chính chứa toàn bộ mã nguồn HTML, CSS và JavaScript
├── audio.mp3        # File âm thanh phát khi mở trang
└── README.md        # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Sử Dụng & Cài Đặt

### 1. Chuẩn Bị File Âm Thanh
Đảm bảo bạn có file âm thanh tên là `audio.mp3` đặt cùng thư mục với file `index.html`.

### 2. Chạy Dự Án
Một số trình duyệt (như Google Chrome) có thể chặn âm thanh tự phát có tiếng khi mở trực tiếp bằng cách nhấp đúp file HTML (`file:///...`). Khi đó, chỉ cần click hoặc chạm một lần trên trang để bắt đầu phát âm thanh.

**Cách khuyến nghị:**
1. Mở thư mục dự án bằng **VS Code**.
2. Cài đặt Extension **Live Server**.
3. Nhấp chuột phải vào `index.html` và chọn **Open with Live Server**.

---

## ⚙️ Tùy Chỉnh Theo Ý Thích

* **Thay Đổi Âm Lượng:**  
  Trong `index.html`, bạn có thể điều chỉnh dòng sau để tăng/giảm độ to của âm thanh (`3.0` tương đương 300%):
  ```javascript
  gainNode.gain.value = 3.0; 
  ```

* **Thay Đổi Danh Sách Lời Chúc:**  
  Bạn có thể thêm các câu chúc mới vào mảng `PHRASES`:
  ```javascript
  const PHRASES = [
      "Anh yêu em", "I love you", "20-10 Vui vẻ nhé", "Thương em nhiều", ...
  ];
  ```

* **Thay Đổi Lời Chúc Trong Thiệp:**  
  Chỉnh sửa nội dung văn bản bên trong thẻ `<div id="greetingModal">...</div>`.

---

## 💌 Lời Chúc
*Chúc tất cả phụ nữ Việt Nam 20/10 luôn xinh đẹp, hạnh phúc và nhận được thật nhiều tình yêu thương!* ❤️