
import { Router, Request, Response } from 'express';

const router = Router();

interface PedidoPersonalizado {
  id: string;
  cliente: string;
  telefono: string;
  tipoPostre: string;
  sabor: string;
  cantidad: number;
  dedicatoria: string;
  fechaEntrega: string;
  estado: 'Recibido' | 'En preparación';
  creadoEn: string;
}

const listaPedidos: PedidoPersonalizado[] = [];

// GET /api/pedidos - Mostrar todos los pedidos
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    total: listaPedidos.length,
    pedidos: listaPedidos
  });
});

// POST /api/pedidos - Registrar un nuevo pedido
router.post('/', (req: Request, res: Response) => {
  const {
    cliente,
    telefono,
    tipoPostre,
    sabor,
    cantidad,
    dedicatoria,
    fechaEntrega
  } = req.body;

  if (!cliente || !telefono || !tipoPostre || !sabor || !fechaEntrega) {
    res.status(400).json({
      error: 'Faltan campos obligatorios (cliente, telefono, tipoPostre, sabor, fechaEntrega).'
    });
    return;
  }

  const nuevoPedido: PedidoPersonalizado = {
    id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    cliente: String(cliente).trim(),
    telefono: String(telefono).trim(),
    tipoPostre: String(tipoPostre).trim(),
    sabor: String(sabor).trim(),
    cantidad: Number(cantidad) > 0 ? Number(cantidad) : 1,
    dedicatoria: dedicatoria
      ? String(dedicatoria).trim()
      : 'Sin dedicatoria',
    fechaEntrega: String(fechaEntrega).trim(),
    estado: 'Recibido',
    creadoEn: new Date().toISOString()
  };

  listaPedidos.push(nuevoPedido);

  res.status(201).json({
    mensaje: 'Pedido registrado correctamente',
    pedido: nuevoPedido
  });
});

export default router;
