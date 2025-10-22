using ApiProductos.Domains.Request;
using ApiProductos.Domains.Response;
using ApiProductos.Models;
using ApiProductos.Respositories.IRepositories;

namespace ApiProductos.Domains.IDomains
{
    public interface ITransaccionDominio : IRepositorio<Transaccion>
    {
        Response<List<Transaccion>> ObtenerTransacciones();
        Response<List<Transaccion>> ObtenerTransaccionPorId(int id);
        Response<int> CrearTransaccion (TransaccionRequest request);
        Response<int> EliminarTransaccion(int id);
        Response<int> ModificarTransaccion(TransaccionRequest request);
    }
}
