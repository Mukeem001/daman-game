import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Status
app.get('/api/status', (req: Request, res: Response) => {
  res.json({ service: 'Matka Admin API', status: 'running' });
});

// In-memory data
let upiMethods: any[] = [];
let apkFiles: any[] = [];

// SETTINGS ROUTES
app.get('/api/admin/settings', (req: Request, res: Response) => {
  res.json({
    appName: 'Matka Pro',
    supportPhone: '+91 9876543210',
    upiId: 'business@paytm',
    bankName: 'HDFC Bank',
    bankAccountNumber: '123456789012',
    bankIfscCode: 'HDFC0001234',
    qrCodeUrl: ''
  });
});

app.put('/api/admin/settings', (req: Request, res: Response) => {
  res.json({ success: true });
});

// UPI
app.get('/api/admin/settings/upi-methods', (req: Request, res: Response) => {
  res.json(upiMethods);
});

app.post('/api/admin/settings/upi-methods', (req: Request, res: Response) => {
  const newUpi = { id: Date.now(), ...req.body, isActive: 'true' };
  upiMethods.push(newUpi);
  res.status(201).json(newUpi);
});

app.delete('/api/admin/settings/upi-methods/:id', (req: Request, res: Response) => {
  upiMethods = upiMethods.filter((m: any) => m.id != req.params.id);
  res.json({ success: true });
});

// APK
app.get('/api/admin/settings/apk-files', (req: Request, res: Response) => {
  res.json(apkFiles);
});

app.post('/api/admin/settings/apk-files', (req: Request, res: Response) => {
  const newApk = {
    id: Date.now(),
    filename: 'app.apk',
    filepath: '/apk/app.apk',
    filesize: '25.4',
    versionCode: req.body.versionCode || '1',
    versionName: req.body.versionName || '1.0.0',
    isActive: 'true'
  };
  apkFiles.push(newApk);
  res.status(201).json(newApk);
});

app.delete('/api/admin/settings/apk-files/:id', (req: Request, res: Response) => {
  apkFiles = apkFiles.filter((f: any) => f.id != req.params.id);
  res.json({ success: true });
});

// QR
app.post('/api/admin/settings/upload-qr', (req: Request, res: Response) => {
  res.json({ qrCodeUrl: 'https://via.placeholder.com/300.png?text=QR' });
});

// DASHBOARD STATS
app.get('/api/admin/dashboard/stats', (req: Request, res: Response) => {
  res.json({
    totalUsers: 1256,
    totalBidsToday: 342,
    totalProfit: 45800,
    activeMarkets: 8,
    depositsToday: 125000,
    withdrawalsToday: 89500
  });
});

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend: http://localhost:${PORT}`);
  console.log(`Frontend: http://localhost:5173`);
});
