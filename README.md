# 🌸 Hiệu Ứng Trái Tim 20/10 - Cuộn Trang 2D & 3D Đa Trải Nghiệm 💖

Một ứng dụng web gửi lời chúc **Ngày Phụ Nữ Việt Nam (20/10)** lãng mạn và tinh tế, được thiết kế dưới dạng **Trang cuộn 2 tầng (Scroll Snap)** kết hợp liền mạch giữa hai thế giới:

1. **Tầng 1 (Trang đầu):** Hiệu ứng Trái Tim Thuật Toán Ghép Lời Chúc 2D bằng **Canvas 2D** (Source cũ).
2. **Tầng 2 (Lướt xuống):** Không Gian Vũ Trụ Trái Tim 3D Hạt & 3 Vành Chữ Xoay bằng **Three.js 3D WebGL** (Source mới).

![Project Status](https://img.shields.io/badge/Status-Completed-brightgreen) ![Three.js](https://img.shields.io/badge/Three.js-r128-black?logo=three.js) ![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas%202D-E34F26?logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Modern%20UI-38B2AC?logo=tailwindcss&logoColor=white)

---

## ✨ Trải Nghiệm Theo Từng Màn Hình

### 💖 Màn Hình 1: Trái Tim Lời Chúc 2D (Source Cũ)
* **Toán học ghép trái tim:** Hàng chục lời chúc yêu thương đa ngôn ngữ (*Anh yêu em, Trâm Võ xinh đẹp nhất thế giới, 20-10 vui vẻ nhóo...*) bay vào định vị thành hình trái tim hoàn mỹ.
* **Tương tác chuột:** Chữ bừng sáng ánh hồng khi rê chuột lại gần.
* **Hạt tim bay bổng:** Các hạt trái tim li ti bay lơ lửng trong không gian nền.
* **Nút điều hướng:** Nút *"Khám phá không gian 3D"* nhấp nháy mời gọi người dùng lướt xuống.

### 💫 Màn Hình 2: Vũ Trụ Trái Tim 3D Hạt & Vành Chữ (Source Mới)
* **Trái tim 3D phát sáng:** Nạp mô hình 3D trái tim với hệ thống 10.000 hạt phát sáng đa sắc (hồng, đỏ, tím).
* **Nhịp tim phập phồng (Beat):** Chuyển động đập nhịp nhàng kết hợp GSAP và Simplex Noise chân thực.
* **3 Vành chữ xoay 360°:** 3 vòng chữ hình trụ phát sáng neon bao quanh và liên tục xoay quanh trái tim.
* **Xoay tương tác 3D:** Giữ chuột trái hoặc vuốt cảm ứng để xoay ngắm trái tim ở mọi góc độ.

---

## 🎛️ Tính Năng Điều Khiển Tiện Lợi (Cố Định Xuyên Suốt)

* **Cuộn trang mượt mà (Smooth Scroll Snap):** Dễ dàng lướt chuột hoặc bấm nút điều hướng/thanh chấm tròn bên phải để chuyển trang.
* **Tối ưu hóa hiệu năng (IntersectionObserver):** Chỉ render đồ họa cho màn hình đang xem, giúp tiết kiệm GPU/CPU và đảm bảo độ mượt 60 FPS.
* **Âm thanh liên tục (`audio.mp3`):** Web Audio API tự động phát nhạc xuyên suốt khi chuyển trang, có nút Bật/Tắt nhạc và biểu tượng sóng nhạc động.
* **Thiệp chúc mừng (Modal Card):** Nút *"Gửi lời chúc đến em"* luôn hiển thị sẵn sàng ở góc trên mọi lúc.

---

## 📂 Cấu Trúc Thư Mục

```text
├── css/
│   └── style.css            # Style bổ trợ
├── js/
│   ├── three.min.js         # Thư viện Three.js WebGL
│   ├── MeshSurfaceSampler.js # Trích xuất phân bố hạt trên bề mặt 3D
│   ├── TrackballControls.js # Tương tác xoay 3D
│   ├── simplex-noise.js     # Thuật toán sinh nhiễu chuyển động hạt
│   ├── OBJLoader.js         # Bộ nạp mô hình 3D (.obj)
│   └── gsap.min.js          # Diễn hoạt nhịp đập tim
├── audio.mp3                # Âm thanh nền
├── heart.obj                # Mô hình 3D trái tim cục bộ
├── index.html               # File chính chứa toàn bộ trải nghiệm cuộn trang
└── README.md                # Tài liệu hướng dẫn
```

---

## 🚀 Hướng Dẫn Mở Dự Án

1. Mở thư mục dự án trong **VS Code**.
2. Nhấp chuột phải vào file [index.html](file:///d:/20-10_web/index.html) và chọn **Open with Live Server**.
3. Cuộn chuột hoặc bấm nút *"Khám phá không gian 3D"* để trải nghiệm hiệu ứng lướt xuống!
