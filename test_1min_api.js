const http = require('http');

function request(path, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...headers }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data: data }); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function test() {
  // Login first
  const loginReq = http.request({
    hostname: 'localhost', port: 5000, path: '/api/auth/login', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const loginData = JSON.parse(data);
      const token = loginData.token;
      console.log('Login:', loginData.success, '| Token:', token ? 'yes' : 'no');

      // Test 30sec history
      const h30 = await request('/api/admin/history/30sec/all?page=1&limit=5', { 'admin-token': token });
      console.log('\n30sec history:', h30.status, '| records:', h30.data.records?.length);

      // Test 1min history
      const h1 = await request('/api/admin/history/1min/all?page=1&limit=5', { 'admin-token': token });
      console.log('1min history:', h1.status, '| records:', h1.data.records?.length);
      if (h1.status !== 200) {
        console.log('1min error:', JSON.stringify(h1.data));
      }

      // Test 3min history
      const h3 = await request('/api/admin/history/3min/all?page=1&limit=5', { 'admin-token': token });
      console.log('3min history:', h3.status, '| records:', h3.data.records?.length);

      // Test 5min history
      const h5 = await request('/api/admin/history/5min/all?page=1&limit=5', { 'admin-token': token });
      console.log('5min history:', h5.status, '| records:', h5.data.records?.length);

      // Test betcontrol 1min
      const bc1 = await request('/api/admin/betcontrol/1min/latest', { 'admin-token': token });
      console.log('\n1min betcontrol:', bc1.status, '| data:', bc1.data.success);
    });
  });
  loginReq.write(JSON.stringify({ email: 'admin@mukeem.com', password: 'mukeem@00' }));
  loginReq.end();
}

test().catch(console.error);

