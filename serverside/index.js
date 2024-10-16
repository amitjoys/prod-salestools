const express = require('express');
const fs = require('fs');

const csv = require('csv-parser');
const path = require('path');
const { parse } = require('json2csv');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

const readCSV = async (filePath) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

app.get('/api/tools', async (req, res) => {
  try {
    const tools = await readCSV('tools.csv');
    const formattedTools = tools.map((row) => ({
      category: row.Headers,
      name: row['Tool Name'],
      href: row.Href,
      description: row.Description,
      rank: parseInt(row.RANK) || 0,
      domain: row.Domain,
      logo: row.Logo,
    }));
    setTimeout(() => res.json(formattedTools), 1000); // Add a 1-second delay
  } catch (error) {
    console.error('Error reading tools CSV:', error);
    res.status(500).json({ error: 'Failed to fetch tools' });
  }
});

app.post('/api/newsletter', async (req, res) => {
    const { email, firstName, lastName, title, companyName, website } = req.body;
    const createdDate = new Date().toISOString();
  
    const newLine = parse([{
      Email: email,
      CreatedDate: createdDate,
      FirstName: firstName,
      LastName: lastName,
      Title: title,
      CompanyName: companyName,
      Website: website
    }], { header: false });
  
    try {
      await fs.promises.appendFile(path.join(__dirname, 'data.csv'), newLine + '\n'); // Using fs.promises
      res.json({ success: true });
    } catch (err) {
      console.error('Error writing to CSV:', err);
      res.status(500).json({ error: 'Failed to save data' });
    }
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});