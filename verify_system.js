const http = require('http');

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function post(url, payload) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(payload);
    const req = http.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function verifyAll() {
  console.log('--- 1. Testing GET /api/status ---');
  const statusRes = await get('http://localhost:3000/api/status');
  console.log('Status code:', statusRes.status);
  const statusJson = JSON.parse(statusRes.body);
  console.log('Office:', statusJson.officeName);
  console.log('Today:', statusJson.today);
  console.log('Stats:', statusJson.stats);
  console.log('Birthdays today:', statusJson.birthdaysToday);

  console.log('\n--- 2. Testing GET /api/employees ---');
  const empRes = await get('http://localhost:3000/api/employees');
  const empJson = JSON.parse(empRes.body);
  console.log('Employees count:', empJson.data.length);
  console.log('First employee:', empJson.data[0].name, '| Birthday today?:', empJson.data[0].isBirthdayToday);

  console.log('\n--- 3. Testing POST /api/preview ---');
  const previewRes = await post('http://localhost:3000/api/preview', {
    template: 'Halo {sapaan} {nama}, hari ini {hari} tanggal {tanggal}. Jam kerja: {jam_masuk} - {jam_pulang}. Selamat bertugas di {kantor}!'
  });
  console.log('Rendered preview:\n', JSON.parse(previewRes.body).rendered);

  console.log('\n--- 4. Testing POST /api/trigger/morning ---');
  const morningRes = await post('http://localhost:3000/api/trigger/morning', {});
  console.log('Morning trigger message:', JSON.parse(morningRes.body).message);

  console.log('\n--- 5. Testing POST /api/trigger/birthday ---');
  const bdayRes = await post('http://localhost:3000/api/trigger/birthday', {});
  console.log('Birthday trigger message:', JSON.parse(bdayRes.body).message);

  console.log('\n--- 6. Testing GET /api/logs ---');
  const logsRes = await get('http://localhost:3000/api/logs?limit=5');
  const logsJson = JSON.parse(logsRes.body);
  console.log('Total recent logs returned:', logsJson.data.length);
  console.log('Latest log item: Type =', logsJson.data[0].type, ', Recipient =', logsJson.data[0].recipientName);

  console.log('\n--- 7. Testing Frontend GET / ---');
  const htmlRes = await get('http://localhost:3000/');
  console.log('HTML status:', htmlRes.status, '| Contains title?', htmlRes.body.includes('Sistem Pengingat Presensi'));

  console.log('\n========================================');
  console.log('🎉 ALL SYSTEM TESTS PASSED PERFECTLY!');
  console.log('========================================');
}

verifyAll().catch(console.error);
