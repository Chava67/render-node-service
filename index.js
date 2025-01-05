require('dotenv').config(); // טוען את משתני הסביבה מקובץ .env
const axios = require('axios');
const express = require('express');
const app = express();

const API_KEY = process.env.RENDER_API_KEY; // המפתח של ה-API
const port = process.env.PORT || 3000; // פורט דינמי של Render

// URL של ה-API
const url = process.env.API_URL;

// מסלול להצגת השירותים
app.get('/', async (req, res) => {
  try {
    // קריאה ל-API
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        includePreviews: 'true',
        limit: 20,
      },
    });

    const services = response.data;

    // פונקציה לעיצוב המידע
    const formattedServices = services.map(({ service }) => ({
      Name: service.name,
      Type: service.type,
      URL: service.serviceDetails.url || 'N/A',
      CreatedAt: service.createdAt,
      UpdatedAt: service.updatedAt,
      DashboardURL: service.dashboardUrl,
      Repository: service.repo,
      Plan: service.serviceDetails.plan,
      Region: service.serviceDetails.region,
      Runtime: service.serviceDetails.runtime,
    }));

    // החזרת המידע בפורמט JSON לדפדפן
    res.json(formattedServices);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).send('Error fetching services');
  }
});



// הפעלת השרת
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
