'use client'; 
import axios from "axios";
import { useEffect, useState } from "react";

async function getProductoById(id) {
    const url = `http://localhost:3000/productos/buscarPorId/${id}`;
    const response = await axios.get(url);
    return response.data;
}

export default function MostrarProducto({ params }) {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const data = await getProductoById(params.id);
                setProducto(data);
            } catch (err) {
                setError("Error: Producto no encontrado.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [params.id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Información del Producto</h1>
            {producto ? (
                <div>
                    <p><strong>ID:</strong> {producto.id}</p>
                    <p><strong>Nombre:</strong> {producto.nombre}</p>
                    <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                    <p><strong>Precio:</strong> ${producto.precio}</p> 
                </div>
            ) : (
                <p>Producto no encontrado.</p>
            )}
        </>
    );
}
