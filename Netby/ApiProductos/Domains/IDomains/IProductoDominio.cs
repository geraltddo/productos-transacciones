using ApiProductos.Domains.Request;
using ApiProductos.Domains.Response;
using ApiProductos.Models;
using ApiProductos.Respositories.IRepositories;

namespace ApiProductos.Domains.IDomains
{
    public interface IProductoDominio : IRepositorio<Producto>
    {
        Response<List<Producto>> ObtenerProductos();
        Response<List<Producto>> ObtenerProductoPorId(int id);
        Response<int> CrearProducto(ProductoRequest request);
        Response<int> EliminarProducto(int id);
        Response<int> ModificarProducto(ProductoRequest request);
    }
}