// usuarios/mostrar/[id]/page.jsx
import axios from "axios";

async function getUsuarioById(id) {
    const url = `http://localhost:3000/buscarPorId/${id}`;
    const response = await axios.get(url);
    return response.data;
}

export default async function MostrarUsuario({ params }) {
    try {
        const usuario = await getUsuarioById(params.id);

        return (
            <>
                <h1>Información del Usuario</h1>
                <p><strong>ID:</strong> {usuario.id}</p>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Usuario:</strong> {usuario.usuario}</p>
                <p><strong>Password:</strong> Confidencial</p>
                <p><strong>Tipo de Usuario:</strong> {usuario.tipoUsuario}</p>
            </>
        );
    } catch (error) {
        return <h1>Error: Usuario no encontrado</h1>;
    }
}
