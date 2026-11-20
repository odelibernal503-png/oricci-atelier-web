
import express from 'express';
import pedidosRouter from './routes/pedidos';

const app = express();
const PORT = 3000;

// Permitir recibir datos JSON
app.use(express.json());

// Conectar las rutas de pedidos
app.use('/api/pedidos', pedidosRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
