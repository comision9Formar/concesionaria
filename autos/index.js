const fs = require("fs");
const autos_db = JSON.parse(fs.readFileSync("./data/autos.json", "utf-8"));
const clientes_db = JSON.parse(fs.readFileSync('./data/clientes.json','utf-8'));

const autos = {
  mensaje: msg => console.log(msg),
  buscarAuto : patente => {
    let result = autos_db.find(auto => auto.patente == patente);
    return result ? result : null;
  },
  venderAuto : patente => {
   autos_db.map(auto => {
      if(auto.patente === patente){
        auto.vendido = true;
      }else{
        autos.mensaje("El auto no está!!!")
      }
    })
    autos.guardarCambios(autos_db)
  },
  guardarCambios : autos => fs.writeFileSync('./data/autos.json',JSON.stringify(autos,null,2),'utf-8'),
  autosParaLaVenta : () => autos_db.filter(auto => auto.vendido === false),
  autosNuevos : () => autos.autosParaLaVenta().filter(auto => auto.km < 100),
  listaDeVentas : () => {
    let autosVendidos = autos_db.filter(auto => auto.vendido)
    return autosVendidos.map(auto => auto.precio)
  },
  totalDeVentas : () => autos.listaDeVentas().reduce((acum,num) => acum + num),
  puedeComprar : (nombre,patente) => {
    let auto = autos.autosParaLaVenta().find(auto => auto.patente === patente);
    let cliente = clientes_db.find(cliente => cliente.nombre.toLowerCase() === nombre.toLowerCase());
    if(cliente){
      if(auto){
        return (cliente.capacidadDePagoTotal >= auto.precio) && (cliente.capacidadDePagoEnCuotas >= auto.precio / auto.cuotas) ? true : false
      }else{
        return "no-auto"
      }
    }
    return "no-cliente"
  },
  autosQuePuedeComprar : nombre => autos.autosParaLaVenta().filter(auto => autos.puedeComprar(nombre,auto.patente))
};

module.exports = autos;
