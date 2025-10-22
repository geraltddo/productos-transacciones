namespace ApiProductos.Utilities
{
    public static class Constantes
    {
        public static string MensajeExitoso = "Se ha cargado correctamente!";
        public static string MensajeError = "Ha existido un error al procesar la información: ";
        public static string MensajeProductoTransaccionError = "producto no encontrado para esta transaccion";
        public static string MensajeStockInsuficiente = "No hay stock suficiente para esta venta";
        public static string MensajeTransaccionNoEncontrada = "transaccion no encontrada";
        public static string MensajeProductoNoEncontrado = "producto no encontrado";
        public static string Creado = "Creado";
        public static string Modificado = "Modificado";
        public static string Eliminado = "Eliminado";
        public static string Error = "Error";
        public static string ErrorPeticionWs = "Existe un error al procesar la petición al web service ";

        public static string connection(IConfiguration config) => config.GetConnectionString("productoFinancieroConnectionString")!;
    }
}
