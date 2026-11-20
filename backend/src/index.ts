import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        estado: 'OK',
        servicio: 'Oricci Atelier Dulce y Salado - API',
        mensaje: 'Contenedor activo y respondiendo correctamente',
        timestamp: new Date().toISOString()
    });
});



app.listen(PORT, () => {
    console.log("Servidor Oricci Atelier corriendo en puerto " + PORT);
});