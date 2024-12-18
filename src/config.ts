import dotenv from 'dotenv'

dotenv.config()

const {
    URL, 
    PUNTO_TICKET_USUARIO,
    PUNTO_TICKET_PASSWORD,
    CODIGO_PROMO,
    CANTIDAD_VENTANAS,
    TIMEOUT_HORAS
} = process.env

const config = {
    url: URL,
    ptUsuario: PUNTO_TICKET_USUARIO || '',
    ptPassword: PUNTO_TICKET_PASSWORD || '',
    codigoPromo: CODIGO_PROMO || '',
    cantidadVentanas: CANTIDAD_VENTANAS || 3, // 3 ventanas por defecto
    tiempoEspera: TIMEOUT_HORAS || 1 // 1 hora por defecto
}

export default config