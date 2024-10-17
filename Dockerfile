# ใช้ Nginx เป็น web server
FROM nginx:alpine

# คัดลอกไฟล์ HTML ไปยัง nginx
COPY . /usr/share/nginx/html