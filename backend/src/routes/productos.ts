import { Router, Request, Response } from 'express';

const router = Router();

interface Producto {
  id: number;
  nombre: string;
  categoria: 'cupcakes' | 'galletas' | 'pasteles' | 'vasos';
  descripcion: string;
  precio: number;
  disponible: boolean;
}

const catalogoPostres: Producto[] = [
  {
    id: 1,
    nombre: 'Cupcake Red Velvet & Queso Crema',
    categoria: 'cupcakes',
    descripcion: 'Bizcocho aterciopelado de cacao suave con frosting artesanal de queso crema.',
    precio: 3.50,
    disponible: true
  },
  {
    id: 2,
    nombre: 'Galleta Gourmet Doble Chocolate y Nueces',
    categoria: 'galletas',
    descripcion: 'Galleta estilo New York crujiente por fuera y suave por dentro con trozos de nuez.',
    precio: 2.75,
    disponible: true
  },
  {
    id: 3,
    nombre: 'Mini Pastel de Frutos Rojos y Vainilla',
    categoria: 'pasteles',
    descripcion: 'Pastel personal de tres capas con compota natural de fresas y frambuesas.',
    precio: 14.00,
    disponible: true
  },
  {
    id: 4,
    nombre: 'Postre en Vaso Tiramisú Artesanal',
    categoria: 'vasos',
    descripcion: 'Capas de crema mascarpone, bizcocho humedecido en café espresso y cacao puro.',
    precio: 4.50,
    disponible: true
  },
  {
    id: 5,
    nombre: 'Cupcake de Limón y Merengue Suizo',
    categoria: 'cupcakes',
    descripcion: 'Relleno de crema ácida de limón natural coronado con merengue suizo flameado.',
    precio: 3.75,
    disponible: true
  }
];

// GET /api/productos -> todo el catalogo
router.get('/', (_req: Request, res: Response) => {
  res.json(catalogoPostres);
});

// GET /api/productos/:categoria -> filtra por cupcakes, galletas, pasteles o vasos
router.get('/:categoria', (req: Request, res: Response) => {
  const categoria = req.params.categoria.toLowerCase();
  const filtrados = catalogoPostres.filter(p => p.categoria === categoria);

  if (filtrados.length === 0) {
    return res.status(404).json({ mensaje: `No hay productos en la categoria '${categoria}'` });
  }

  res.json(filtrados);
});

export default router;
