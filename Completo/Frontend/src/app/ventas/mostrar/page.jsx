import Link from "next/link";
import CancelVent from "@/components/cancelarVenta";
import EditVent from "@/components/editarVent";
import AddVenta from "@/components/nuevaVenta";
import axios from "axios";


async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    return (
        <>
            <h1>Ventas</h1>
            <AddVenta /> 
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th> 
                        <th>Producto</th> 
                        <th>Cantidad Vendida</th>
                        <th>Editar / Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta, i) => (
                            <tr key={venta.id}> 
                                <td>
                                    <Link href={`/ventas/mostrar/${venta.id}`}> 
                                        {i + 1} 
                                    </Link>
                                </td>
                                <td>{venta.usuarioNombre}</td> 
                                <td>{venta.productoNombre}</td> 
                                <td>{venta.cantidad}</td>
                                <td>
                                    <div className="d-flex">
                                        <EditVent id={venta.id} />
                                        <div style={{ margin: '0 10px' }}></div>
                                        <CancelVent id={venta.id} />
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
