import Link from "next/link";
import DeleteUser from "@/components/borrar";
import EditUser from "@/components/editar";
import AddUser from "@/components/nuevo";
import axios from "axios";

async function getUsuarios() {
    const url = "http://localhost:3000";
    const usuarios = await axios.get(url);
    return usuarios.data;
}
export default async function User() {
    const usuarios = await getUsuarios();
    return (
        <>
            <h1>Usuarios</h1>
            <AddUser /> 
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Edit / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, i) => (
                            <tr key={usuario.id}> 
                                <td>{i + 1}</td> 
                                <td>
                                    <Link href={`http://localhost:3001/usuarios/mostrar/${usuario.id}`}> 
                                        {usuario.nombre}
                                    </Link>
                                </td>
                                <td>{usuario.usuario}</td>
                                <td>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <DeleteUser id={usuario.id} />
                                        <EditUser id={usuario.id} />
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
