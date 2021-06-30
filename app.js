const process = require('process');
const {buscarAuto,venderAuto,autosParaLaVenta,autosNuevos,autosQuePuedeComprar,totalDeVentas,listaDeVentas,puedeComprar, mensaje} = require('./autos');

const comando = process.argv[2];

switch (comando) {
    case "buscar":
        if(process.argv[3]){
            let result = buscarAuto(process.argv[3]);
            result ? mensaje(result) : mensaje('No hay resultado para tu búsqueda!!');
        }else{
            mensaje('Decime la patente!!!')
        }
        break;
    case "vender" :
        if(process.argv[3]){
            venderAuto(process.argv[3]);
            mensaje('auto vendido!!!')
        }else{
            mensaje('Decime la patente!!!')
        }
    case "consultar":
        autosParaLaVenta().forEach(auto => {
            mensaje(`${auto.marca} - ${auto.modelo} - ${auto.precio}`)
        });
    case "nuevos" :
        autosNuevos().forEach(auto => {
            mensaje(`${auto.marca} - ${auto.modelo} - ${auto.precio}`)
        })
    case "ventas" :
        listaDeVentas().forEach(precio => {
            mensaje(`-> $${precio}`)
        })
    case "total" :
        mensaje('Total de ventas: $' + totalDeVentas())
    case "compra":
        let cliente = process.argv[3];
        let patente = process.argv[4];

       switch (puedeComprar(cliente,patente)) {
           case true:
               mensaje("Compralo!!!")
               break;
            case false:
                mensaje('Lo siento, no te da el cuero!!')
                break
            case "no-auto":
                mensaje("El auto no existe o no está a la venta")
                break
            case "no-cliente":
                mensaje("El cliente no está registrado :(")
                break
           default:
               break;
       }
        
    default:
        break;
}