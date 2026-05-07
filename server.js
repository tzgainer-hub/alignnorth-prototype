const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'blog.html'));
});

app.get('/founder', (req, res) => {
  res.sendFile(path.join(__dirname, 'founder.html'));
});

app.get('/blog/:slug', (req, res) => {
  const slug = req.params.slug.replace(/[^a-z0-9-]/gi, '');
  const file = path.join(__dirname, `blog-${slug}.html`);
  if (fs.existsSync(file)) {
    return res.sendFile(file);
  }
  return res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Align North Scottsdale running on port ${PORT}`);
});
