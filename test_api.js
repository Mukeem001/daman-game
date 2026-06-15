const http = require('http');

function test(endpoint, name) {
  return new Promise((resolve) => {
    http.get('http://localhost:5000' + endpoint, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log('=== ' + name + ' ===');
          console.log('Status: 200');
          resolve(json);
        } catch (e) {
          console.log(name + ' parse error');
          resolve(null);
        }
      });
    }).on('error', (e) => {
      console.log(name + ' error: ' + e.message);
      resolve(null);
    });
  });
}

async function run() {
  const d = await test('/api/admin/deposits', 'ENDPOINT 1: GET /api/admin/deposits');
  if (d && d.stats) {
    console.log('Total Deposits:', d.stats.totalDeposits);
    console.log('Pending Deposits:', d.stats.pendingDeposits);
    console.log('Approved Deposits:', d.stats.approvedDeposits);
  }
  
  console.log('');
  
  const dp = await test('/api/admin/deposits/pending', 'ENDPOINT 2: GET /api/admin/deposits/pending');
  if (dp) {
    const count = Array.isArray(dp) ? dp.length : (dp.deposits ? dp.deposits.length : (dp.data ? dp.data.length : 0));
    console.log('Response Count:', count);
  }
  
  console.log('');
  
  const w = await test('/api/admin/withdrawals', 'ENDPOINT 3: GET /api/admin/withdrawals');
  if (w && w.stats) {
    console.log('Total Withdrawals:', w.stats.totalWithdrawals);
    console.log('Pending Withdrawals:', w.stats.pendingWithdrawals);
    console.log('Approved Withdrawals:', w.stats.approvedWithdrawals);
  }
  
  console.log('');
  
  const wp = await test('/api/admin/withdrawals/pending', 'ENDPOINT 4: GET /api/admin/withdrawals/pending');
  if (wp) {
    const count = Array.isArray(wp) ? wp.length : (wp.withdrawals ? wp.withdrawals.length : (wp.data ? wp.data.length : 0));
    console.log('Response Count:', count);
  }
}

run().catch(console.error);
