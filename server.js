 
// 1. استدعاء المكتبات المطلوبة
const express = require('express');
const dotenv = require('dotenv');

// 2. تحميل إعدادات ملف .env
dotenv.config();

// 3. إنشاء نسخة من تطبيق Express
const app = express();

// 4. الـ Middleware الأساسي لقراءة البيانات القادمة بصيغة JSON
app.use(express.json());

// 5. الـ Route المبدئي للتأكد من أن السيرفر يعمل بنجاح
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Welcome to TechMaster E-Commerce API (Phase 1 / Sprint 1)"
    });
});

// 6. تحديد البورت وتشغيل السيرفر
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running in development mode on port ${PORT}`);
});