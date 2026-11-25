const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'about.html',
  'contact-us.html',
  'blog.html',
  'privacy-policy.html',
  'terms-of-service.html',
  'services/car-moving.html',
  'services/interprovincial-moving.html',
  'services/local-moving.html',
  'services/long-distance-moving.html',
  'services/office-moving.html',
  'services/packaging-services.html',
  'services/piano-moving.html',
  'services/senior-moving.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/href="mailto:[^"]*"/g) || [];
  console.log(f + ': ' + matches.join(', '));
});
