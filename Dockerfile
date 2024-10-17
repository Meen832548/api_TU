# ใช้ Nginx เป็นเว็บเซิร์ฟเวอร์
FROM nginx:alpine

# คัดลอกไฟล์ทั้งหมดไปยังโฟลเดอร์ที่ Nginx ให้บริการ
COPY . /usr/share/nginx/html

# เปิดพอร์ต 80
EXPOSE 80
