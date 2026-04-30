import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database setup
const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Init DB tables
db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    imageUrl TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS admin_user (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );
`);

// Insert default admin if not exists (username: admin, password: password)
const adminExists = db.prepare('SELECT id FROM admin_user WHERE id = 1').get();
if (!adminExists) {
  db.prepare('INSERT INTO admin_user (id, username, password) VALUES (?, ?, ?)').run(1, 'admin', 'password'); // use simple auth for prototype
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // API Routes
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM admin_user WHERE username = ? AND password = ?').get(username, password);
    if (user) {
      res.json({ token: 'dummy-admin-token' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });

  const checkAuth = (req: any, res: any, next: any) => {
    const token = req.headers.authorization;
    if (token === 'Bearer dummy-admin-token') {
      next();
    } else {
      res.status(401).json({ error: 'Não autorizado' });
    }
  };

  app.get('/api/posts', (req, res) => {
    const posts = db.prepare('SELECT * FROM blog_posts ORDER BY createdAt DESC').all();
    res.json(posts);
  });

  app.get('/api/posts/:id', (req, res) => {
    const post = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(req.params.id);
    if (post) res.json(post);
    else res.status(404).json({ error: 'Não encontrado' });
  });

  app.post('/api/posts', checkAuth, upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    
    try {
      const result = db.prepare('INSERT INTO blog_posts (title, content, imageUrl) VALUES (?, ?, ?)').run(title, content, imageUrl);
      res.json({ id: result.lastInsertRowid, title, content, imageUrl });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;
    try {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('SMTP credentials not configured. Returning success for prototype.');
        return res.json({ success: true, warning: 'SMTP not configured' });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports usually
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER, // Sender address
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Receiver address
        subject: `Novo contato do site: ${name}`,
        text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nMensagem:\n${message}`,
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('Email error:', error);
      res.status(500).json({ error: error.message || 'Erro ao enviar e-mail' });
    }
  });

  app.delete('/api/posts/:id', checkAuth, (req, res) => {
    db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
