const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../modelos/UsuarioModelo");
const { encryptPass, validarPass, usuarioAuto, adminAuto } = require("../middlewares/funcionesPass");

function validarDatos(usuario) {
    return usuario.nombre !== undefined && usuario.usuario !== undefined && usuario.password !== undefined;
}

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    const usuariosValidos = [];
    usuarios.forEach(usuario => {
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validarDatos(usuario1.getUsuario)) {
            usuariosValidos.push(usuario1.getUsuario);
        }
    });
    return usuariosValidos;
}

async function busXId(id) {
    const usuario = await usuariosBD.doc(id).get();
    const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
    return validarDatos(usuario1.getUsuario) ? usuario1.getUsuario : undefined;
}

async function newUser(data) {
    const { salt, hash } = encryptPass(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario";
    const usuario1 = new Usuario(data);
    if (validarDatos(usuario1.getUsuario)) {
        await usuariosBD.doc().set(usuario1.getUsuario);
        return true;
    }
    return false;
}

async function deleteUser(id) {
    const usuarioValido = await busXId(id);
    if (usuarioValido) {
        await usuariosBD.doc(id).delete();
        return true;
    }
    return false;
}

async function editUser(id, newData) {
    const usuarioExistente = await busXId(id);
    let usuarioEditado = false;

    if (usuarioExistente) {
        const usuarioActualizado = {};
        if (newData.nombre !== undefined) usuarioActualizado.nombre = newData.nombre;
        if (newData.usuario !== undefined) usuarioActualizado.usuario = newData.usuario;
        if (newData.password !== undefined) usuarioActualizado.password = newData.password;

        if (Object.keys(usuarioActualizado).length > 0) {
            await usuariosBD.doc(id).update(usuarioActualizado);
            usuarioEditado = true;
        }
    }

    return usuarioEditado;
}

module.exports = {
    mostrarUsuarios,
    busXId,
    deleteUser,
    newUser,
    editUser
};
