import axios from "axios";

async function getVentaById(id) {
    const url = `http://localhost:3000/ventas/buscarPorId/${id}`; 
    const response = await axios.get(url);
    return response.data;
}


const parseFirebaseDate = (firebaseDate) => {
    if (!firebaseDate) {
        console.error("La fecha de Firebase es undefined");
        return new Date(); 
    }

    const [datePart, timePart] = firebaseDate.split(", "); 
    const [day, monthYear] = datePart.split(" de "); 
    const [month, year] = monthYear.split(" "); 
    const [time, period] = timePart.split(" "); 

    const months = {
        enero: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11,
    };

    let hours = parseInt(time.split(":")[0], 10);
    if (period === "p.m." && hours !== 12) {
        hours += 12; 
    } else if (period === "a.m." && hours === 12) {
        hours = 0; 
    }

    return new Date(year, months[month], day, hours, parseInt(time.split(":")[1], 10), parseInt(time.split(":")[2], 10));
};




export default async function Productos({ params }) {
    const { id } = params; 
    let venta;

    try {
       
        venta = await getVentaById(id);
        if (!venta) {
            console.error("No se encontró la venta con ID:", id);
            return <h1>No se encontró la venta</h1>;
        }
    } catch (error) {
        console.error("Error al obtener la venta:", error);
        return <h1>Error al cargar la venta</h1>;
    }

    console.log("Valor de venta:", venta); 


    const fechaHora = parseFirebaseDate(venta.fechaHora);

   
    const formattedDate = fechaHora.toLocaleDateString(); 
    const formattedTime = fechaHora.toLocaleTimeString(); 

    return (
        <>
            <h1>Detalles de la Venta</h1>
            <p><strong>Cantidad:</strong> {venta.cantidad}</p>
            <p><strong>Estado:</strong> {venta.estado}</p>
            <p><strong>Fecha:</strong> {formattedDate}</p> 
            <p><strong>Hora:</strong> {formattedTime}</p> 
            <p><strong>Producto:</strong> {venta.productoNombre}</p> 
            <p><strong>Usuario:</strong> {venta.usuarioNombre}</p> 
        </>
    );
}
