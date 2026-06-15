const http = require('http');

const BASE_URL = 'localhost';
const PORT = 5000;

function request(path, method = 'GET', body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: PORT,
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json', ...headers }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function testBackend() {
  console.log('=== BACKEND API TEST ===\n');

  // 1. Test health endpoint
  try {
    const health = await request('/health');
    console.log('✅ Health:', JSON.stringify(health.data));
  } catch (e) {
    console.log('❌ Health failed:', e.message);
    console.log('   Backend is NOT running on port 5000!');
    console.log('   Pehle "cd backend && npm start" chalao.');
    return;
  }

  // 2. Test admin login
  let token;
  try {
    const login = await request('/api/auth/login', 'POST', {
      email: 'admin@mukeem.com',
      password: 'mukeem@00'
    });
    token = login.data.token;
    console.log('\n✅ Login success. Token:', token ? token.substring(0, 30) + '...' : 'NO TOKEN');
    if (!token) {
      console.log('   Login response:', JSON.stringify(login.data));
    }
  } catch (e) {
    console.log('\n❌ Login failed:', e.message);
    return;
  }

  // 3. Test dashboard WITH token
  try {
    const stats = await request('/api/admin/dashboard/stats', 'GET', null, { 'admin-token': token });
    console.log('\n✅ Dashboard stats WITH token:', stats.status, '| success:', stats.data.success);
  } catch (e) {
    console.log('\n❌ Dashboard stats WITH token failed:', e.message);
  }

  // 4. Test dashboard WITHOUT token
  try {
    const statsNoToken = await request('/api/admin/dashboard/stats');
    console.log('\n✅ Dashboard WITHOUT token correctly rejected:', statsNoToken.status, '| error:', statsNoToken.data.error);
  } catch (e) {
    console.log('\n❌ Dashboard WITHOUT token error:', e.message);
  }

  // 5. Test CORS preflight
  try {
    const cors = await request('/api/admin/users', 'OPTIONS', null, {
      'Origin': 'http://localhost:5173',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'admin-token,Content-Type'
    });
    console.log('\n✅ CORS preflight status:', cors.status);
    console.log('   access-control-allow-origin:', cors.headers['access-control-allow-origin']);
    console.log('   access-control-allow-headers:', cors.headers['access-control-allow-headers']);
  } catch (e) {
    console.log('\n❌ CORS preflight failed:', e.message);
  }

  // 6. Test users endpoint
  try {
    const users = await request('/api/admin/users?page=1&limit=5', 'GET', null, { 'admin-token': token });
    console.log('\n✅ Users WITH token:', users.status, '| success:', users.data.success, '| count:', users.data.count);
  } catch (e) {
    console.log('\n❌ Users WITH token failed:', e.message);
  }

  // 7. Test bets endpoint
  try {
    const bets = await request('/api/admin/bets?page=1&limit=5', 'GET', null, { 'admin-token': token });
    console.log('\n✅ Bets WITH token:', bets.status, '| success:', bets.data.success, '| total:', bets.data.stats?.totalBets);
  } catch (e) {
    console.log('\n❌ Bets WITH token failed:', e.message);
  }

  // 8. Test betcontrol endpoint
  try {
    const bc = await request('/api/admin/betcontrol/30sec/latest', 'GET', null, { 'admin-token': token });
    console.log('\n✅ BetControl WITH token:', bc.status, '| success:', bc.data.success);
  } catch (e) {
    console.log('\n❌ BetControl WITH token failed:', e.message);
  }

  // 9. Test history endpoint
  try {
    const hist = await request('/api/admin/history/30sec/all?page=1&limit=5', 'GET', null, { 'admin-token': token });
    console.log('\n✅ History WITH token:', hist.status, '| success:', hist.data.success, '| records:', hist.data.records?.length);
  } catch (e) {
    console.log('\n❌ History WITH token failed:', e.message);
  }

  // 10. Test settings endpoint
  try {
    const settings = await request('/api/admin/settings', 'GET', null, { 'admin-token': token });
    console.log('\n✅ Settings WITH token:', settings.status, '| success:', settings.data.success);
  } catch (e) {
    console.log('\n❌ Settings WITH token failed:', e.message);
  }

  console.log('\n=== TEST COMPLETE ===');
}

testBackend().catch(console.error);

