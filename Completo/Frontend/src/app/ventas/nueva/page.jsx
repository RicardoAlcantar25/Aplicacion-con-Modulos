'use client';
import axios from "axios";
import { useState } from "react";

export default function NuevaVenta() {
    const [usuarioId, setUsuarioId] = useState(""); 
    const [productoId, setProductoId] = useState("");
    const [cantidad, setCantidad] = useState("");

    
    async function newVenta(e) {
        e.preventDefault(); 
        const url = "http://localhost:3000/ventas/nuevaVenta";

       
        const datos = {
            idUsuario: usuarioId,
            idProducto: productoId,
            cantidad: cantidad
        };

        try {
            const response = await axios.post(url, datos); 
            console.log("Venta agregada:", response.data);
            location.replace("http://localhost:3001/ventas/mostrar"); 
        } catch (error) {
            console.error("Error al agregar venta:", error.response.data);
            alert(error.response.data.message || "Error al agregar venta. Intente nuevamente."); 
        }
    }

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={newVenta}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Nueva Venta</h1>
                        </div>
                        <div className="card-body">
                            <input
                                placeholder="ID Usuario"
                                className="form-control mb-3"
                                type="text"
                                value={usuarioId} 
                                onChange={(e) => setUsuarioId(e.target.value)} 
                                required 
                            />
                            <input
                                placeholder="ID Producto"
                                className="form-control mb-3"
                                type="text"
                                value={productoId} 
                                onChange={(e) => setProductoId(e.target.value)} 
                                required 
                            />
                            <input
                                placeholder="Cantidad"
                                className="form-control mb-3"
                                type="text" 
                                value={cantidad} 
                                onChange={(e) => setCantidad(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar venta</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
