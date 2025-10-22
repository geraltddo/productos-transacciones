namespace ApiProductos.Domains.Request
{
    public record ProductoRequest(int Id, string? Nombre, string? Descripcion, string Categoria, string Imagen, decimal Precio, int Stock);
    public record TransaccionRequest (int Id, int IdProducto, int Cantidad, decimal PrecioUnitario, decimal PrecioTotal, string Detalle, DateTime Fecha, string TipoTransaccion);
}
