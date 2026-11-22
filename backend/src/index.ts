import express, { Request, Response } from 'express';
import productosRouter from './routes/productos';
import pedidosRouter from './routes/pedidos';

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint de salud (Edgar)
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'oricci-backend' });
});

// Rutas de catálogo y pedidos (Leonardo y Ricardo)
app.use('/api/productos', productosRouter);
app.use('/api/pedidos', pedidosRouter);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});