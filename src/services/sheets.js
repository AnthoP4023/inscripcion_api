
import dotenv from 'dotenv';
dotenv.config();

import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Leer datos
export const getRows = async (range = 'A:Z') => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const [headers, ...rows] = res.data.values;
  
  // Convierte cada fila en un objeto usando los headers
  return rows.map(row => 
    headers.reduce((obj, header, i) => {
      obj[header.trim()] = row[i] || null;
      return obj;
    }, {})
  );
};

export const appendRow = async (values, range = 'A:Z') => {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
};