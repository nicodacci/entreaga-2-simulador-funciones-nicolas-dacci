//Entrega n° 2 - Simulador créditos usando funciones -
//Nicoás Dacci - comisión 38030 - 27/7/22


//----------------variables globales---------------------------

let tipoCredito 
let ingresosNetos
let sumaSolicitada
let cantidadCuotas
let valorCuota
let interes

const interesPersonal = 0.05    //interes mensual
const interesHipotecario = 0.01
const interesPrendario = 0.03

//------------funcion anonima para calcular intereses------------------

const cuotaIntereses = function(sumaSolicitada, interes, cantidadCuotas){ return ((interes * sumaSolicitada) / (1-(1+interes)**(-cantidadCuotas)))}


//-----------------comienzo a ejecutar la aplicacion-----------

principal()


//-------------------------funcion principal--------------------

function principal(){

    //respuesta e ingresos son una var loc q viven dentro de principal
    let respuesta = confirm("Desea consultar por un credito?")
    let ingresos

    if (respuesta){

        ingresos = ingresosMensuales()//lo retornado x la f lo almaceno en ingresos

        if (ingresos > 100000){
            menuSeleccion() //llamo a la f menu selecc
            asignaIntereses()
            montoSolicitar()
            seleccionaCuotas()
            resumen()
        }else{
            alert("Lo lamentamos, sus ingresos están por debajo del límite requerido, no tiene acceso a crédito")
        }
    }
    alert("Siga recorriendo nuestra web y conozca otros productos...")//sino me retiro

}

//------------------------funciones------------------------------

function menuSeleccion(){
  
    let opciones

    do{

    opciones = prompt("Ingrese la opción que desea consultar", "1-Personal, 2-Hipotecario, 3-Prendario")
    
    } while( !(opciones == 1 || opciones == 2 || opciones == 3 || opciones == null))
    
    seleccionaTipoCredito(opciones)//llamo a l f y le paso como parametro la opcion seleccionada
}


function seleccionaTipoCredito(opc){// recibe como parametro opciones y la almacena en opc para el switch

    switch(opc){
        case "1":
            tipoCredito = "Personal"
            break

        case "2":
            tipoCredito = "Hipotecario"
            break

        case "3":
            tipoCredito = "Prendario"
            break

        default:
            console.alert("algo anda mal")
            break
    }

    alert("Usted seleccionó un crédito " + tipoCredito)   
}


function ingresosMensuales(){

    do{
    ingresosNetos = parseInt(prompt("Ingrese sus ingresos netos"))

    } while ( isNaN(ingresosNetos) == true || ingresosNetos == null) 

    ingresosNetos = Math.round(ingresosNetos)
    return ingresosNetos 
}


function montoSolicitar(){

    let limite
    
    switch(tipoCredito){
        case "Personal":
            limite = ingresosNetos * 10
            break

        case "Hipotecario":
            limite = ingresosNetos * 100
            break

        case "Prendario":
            limite = ingresosNetos * 50
            break

        default:
            console.alert("algo anda mal")
            break
    }

    alert("Su límite para crédito " + tipoCredito + " de acuerdo a sus ingresos declarados es $" + limite)

    do{

    sumaSolicitada = parseInt(prompt("Ingrese el dinero que quiere solicitar"))
    
    } while((sumaSolicitada < 0) || (sumaSolicitada > limite) || (isNaN(sumaSolicitada) == true) || sumaSolicitada == null)

}


function seleccionaCuotas(){
     
    let anios
    
    if (tipoCredito == "Personal"){

            do{
            cantidadCuotas = prompt("ingrese la cantidad de cuotas, hasta 24", "Sólo números")
            }while(cantidadCuotas < 0 || cantidadCuotas > 24 || (isNaN(cantidadCuotas) == true) || cantidadCuotas == null)

            valorCuota = sumaSolicitada / cantidadCuotas
    }


    if (tipoCredito == "Hipotecario"){

            do{
            anios = prompt("ingrese la cantidad de años, hasta 30", "Sólo números")
            } while ( anios < 0 || anios > 30)

            cantidadCuotas = anios * 12
            valorCuota = sumaSolicitada / cantidadCuotas
    }
    
    if (tipoCredito == "Prendario"){

        do{
        cantidadCuotas = prompt("ingrese la cantidad de cuotas, hasta 48", "Sólo números")
        } while (cantidadCuotas < 0 || cantidadCuotas > 48)

        valorCuota = sumaSolicitada / cantidadCuotas
    }
}


function asignaIntereses(){
    if (tipoCredito == "Personal"){
        interes = interesPersonal
    }

    if (tipoCredito == "Hipotecario"){
        interes = interesHipotecario
        }

    if (tipoCredito == "Prendario"){
        interes = interesPrendario
    }
}


function resumen(){
    
    alert("Usted seleccionó un crédito " + tipoCredito + " por una suma de $" + sumaSolicitada + ", " + "en " + cantidadCuotas + " cuotas. El monto de la cuota es $" + Math.round(cuotaIntereses(sumaSolicitada, interes, cantidadCuotas)))
    
}