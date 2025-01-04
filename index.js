require('dotenv').config();  // טוען את משתני הסביבה מקובץ .env
const axios = require('axios');
const express = require('express');  // הוספת הייבוא של express
const app = express();  // יצירת אובייקט האפליקציה

// קריאה ל-API של Render עם המפתח שנמצא ב-.env
const API_KEY = process.env.RENDER_API_KEY;
const port = process.env.PORT || 3000; // Render מספק פורט דינמי

const url = 'https://api.render.com/v1/services';

axios.get(url, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
  params: {
    includePreviews: 'true', // אם אתה רוצה לכלול שירותים עם Previews
    limit: 20, // להחזיר עד 20 שירותים
  },
})
  .then(response => {
    console.log(response.data); // הצגת הנתונים
  })
  .catch(err => {
    console.error('Error fetching services:', err); // הצגת שגיאה במקרה של תקלה
  });

// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
