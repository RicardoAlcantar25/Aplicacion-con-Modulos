import AddProd from "@/components/nuevoProd";
import DeleteProd from "@/components/borrarProd";
import EditProd from "@/components/editarProd";
import axios from "axios";
import Link from "next/link";

async function getProductos() {
    const url = "http://localhost:3000/productos";
    const productos = await axios.get(url);
    return productos.data;
}

export default async function Product() {
    const productos = await getProductos();
    return (
        <>
            <h1>Productos</h1>
            <AddProd /> 
            <table className="table">
                <thead>
                    <tr>
                        <th>Id (Visualizado)</th> 
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th> 
                        <th>Edit / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map((producto, i) => (
                            <tr key={i}>
                                <td>
                                    <Link href={`/productos/mostrar/${producto.id}`}>{i + 1}</Link> 
                                </td>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precio}</td> 
                                <td>
                                    <div className="d-flex">
                                        <EditProd id={producto.id} />
                                        <div style={{ margin: '0 10px' }}></div>
                                        <DeleteProd id={producto.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
