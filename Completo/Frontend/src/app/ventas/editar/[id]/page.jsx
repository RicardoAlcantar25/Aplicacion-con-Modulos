'use client';
import { useEffect, useRef } from "react";
import axios from "axios";

async function editVenta(e, id) {
    e.preventDefault();
    const url = `http://localhost:3000/ventas/editarVenta/${id}`;
    const datos = {
        cantidad: document.getElementById("cantidad").value
    };
    await axios.patch(url, datos); 
    location.replace("http://localhost:3001/ventas/mostrar");
}

export default function EditarVenta({ params }) {
    const cantidadRef = useRef(null);
    const id = params?.id;

    useEffect(() => {
        async function fetchVenta() {
            if (id) {
                const url = `http://localhost:3000/ventas/buscarPorId/${id}`;
                const response = await axios.get(url);


                if (cantidadRef.current) {
                    cantidadRef.current.value = response.data.cantidad;
                }
            }
        }
        fetchVenta();


        if (cantidadRef.current) {
            cantidadRef.current.focus();
        }
    }, [id]);

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={(e) => editVenta(e, id)} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Editar Venta</h1>
                        </div>
                        <div className="card-body">
                            <input
                                ref={cantidadRef}
                                id="cantidad"
                                placeholder="Cantidad Vendida"
                                className="form-control mb-3"
                                type="text"
                            />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
