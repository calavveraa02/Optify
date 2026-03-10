const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let settings = {
  branding: {
    primary_color: '#2ecc71',
    secondary_color: '#27ae60',
    company_name: 'Optify',
    app_tagline: 'Ahorra en tu factura de luz'
  },
  notifications: {
    renewal_alert_30: true,
    renewal_alert_60: true,
    renewal_alert_90: false,
    email_notifications: true,
    push_notifications: true
  },
  business: {
    currency: 'EUR',
    tax_rate: 21,
    contract_min_months: 12,
    auto_renewal_default: false
  }
};

let clients = [];
let contracts = [];
let bills = [];

app.get('/api/settings', (req, res) => res.json(settings));

app.post('/api/settings', (req, res) => {
  const { category, data } = req.body;
  if (settings[category]) {
    settings[category] = { ...settings[category], ...data };
    res.json({ success: true, settings });
  } else {
    res.status(400).json({ error: 'Categoría inválida' });
  }
});

app.post('/api/clients', (req, res) => {
  const client = { id: Date.now(), ...req.body, created_at: new Date() };
  clients.push(client);
  res.json({ success: true, client });
});

app.get('/api/clients', (req, res) => res.json(clients));

app.post('/api/contracts', (req, res) => {
  const contract = { id: Date.now(), ...req.body, created_at: new Date() };
  contracts.push(contract);
  res.json({ success: true, contract });
});

app.get('/api/contracts', (req, res) => res.json(contracts));

app.post('/api/bills', (req, res) => {
  const bill = { id: Date.now(), ...req.body, upload_date: new Date() };
  bills.push(bill);
  res.json({ success: true, bill });
});

app.get('/api/bills', (req, res) => res.json(bills));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/crm', (req, res) => res.sendFile(path.join(__dirname, 'public', 'crm.html')));

app.listen(PORT, () => {
  console.log(`🚀 Optify corriendo en puerto ${PORT}`);
});
