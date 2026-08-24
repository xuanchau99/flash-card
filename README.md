# DailyLingo

Web flashcard từ vựng tiếng Anh giao tiếp hằng ngày, xây dựng bằng HTML, CSS và JavaScript thuần.

## Chạy ứng dụng

Mở trực tiếp `index.html` bằng trình duyệt hiện đại. Không cần cài package hoặc chạy máy chủ.

Nếu muốn chạy qua local server:

```powershell
python -m http.server 8080
```

Sau đó truy cập `http://localhost:8080`.

## Tính năng

- 12.256 mục từ Anh–Việt không trùng tên: 375 flashcard giao tiếp tuyển chọn và 11.881 mục từ điển mở rộng
- 16 nhóm/chủ đề, cấp độ A1–B2
- Lật thẻ 3D, phát âm bằng Web Speech API
- Hiển thị bản dịch tiếng Việt của câu ví dụ; câu mở rộng được dịch khi xem và lưu cache cục bộ
- Tìm kiếm từ, nghĩa và câu ví dụ
- Lọc theo chủ đề và cấp độ
- Đánh dấu từ đã lưu, trạng thái đã nhớ/hơi khó/học lại
- Bài luyện viết nghĩa Việt → từ Anh, công bố kết quả và điểm thang 10 sau khi hoàn thành
- Bài luyện phát âm có giọng mẫu, thu âm qua microphone và chấm mức độ nhận diện từ 1–100%
- Chọn bài 10, 20, 30, 50 hoặc 100 từ; luyện riêng từ đã lưu hoặc từ từng trả lời sai
- Xáo bài, học lại và học riêng bộ từ đang lọc
- Mục tiêu ngày, chuỗi ngày học và lưu tiến độ bằng localStorage
- Giao diện responsive, dark mode và phím tắt

## Dữ liệu mở rộng

`dictionary.js` là tập dữ liệu dẫn xuất gọn cho trình duyệt. Xem nguồn và giấy phép tại `ATTRIBUTION.md`.

Nghĩa chính được chọn theo ba lớp: hiệu chỉnh học tập cho 220 từ phổ biến, loại từ thông dụng dựa trên tần suất nghĩa WordNet, sau đó mới dùng nghĩa chính theo thứ tự từ điển nguồn. Pipeline không còn chọn “định nghĩa ngắn nhất”.

Chạy lại quá trình tạo và kiểm tra dữ liệu:

```powershell
python scripts\build_dictionary.py
python scripts\audit_dictionary.py boy
```

Kết quả audit gần nhất nằm trong `dictionary-audit.json`.

Bản dịch tiếng Việt cho câu ví dụ trong kho mở rộng được lấy khi người dùng lật thẻ qua MyMemory Translation API và lưu tối đa 400 bản dịch gần nhất trong `localStorage`. Các thẻ giao tiếp tuyển chọn dùng bản dịch tích hợp sẵn và không cần gọi mạng.
 
