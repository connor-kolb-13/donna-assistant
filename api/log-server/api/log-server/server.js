import express from 'express';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logPath = path.resolve(__dirname, '../../docs/logs/DAA_ProjectLog.md');

app.post('/log/standup', (req, res) => {
  const { assistant, completed, next, blockers } = req.body;

  if (!assistant || !completed || !next) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const date = new Date().toISOString().split('T')[0];
  const logEntry = \
## \ — \

? Completed:
\

?? In Progress:
\

?? Blockers:
\

---
\;

  try {
    fs.appendFileSync(logPath, logEntry);
    res.status(200).type('text/markdown').send(logEntry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to write to log file', details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(\?? Log API running on port \\));
