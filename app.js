const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [];

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res) => {
  const id = req.params.id;
  const item = items.find(item => item.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = Date.now().toString(); // Timestamp for unique id
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const updateItem = req.body;
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items[index] = { ...items[index], ...updateItem };
  res.json(items[index]);
});

app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const deletedItem = items.splice(index, 1);
  res.json(deletedItem[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

