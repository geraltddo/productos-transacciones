export interface ITransaccion {
    id: number;
    idProducto: number;
    cantidad: number;
    precioUnitario: number;
    precioTotal: number;
    detalle: string;
    fecha: string;
    tipoTransaccion: TipoTransaccion;
}

export enum TipoTransaccion {
    Compra = 'Compra',
    Venta = 'Venta'
}