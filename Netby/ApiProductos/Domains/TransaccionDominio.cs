using ApiProductos.Domains.IDomains;
using ApiProductos.Domains.Request;
using ApiProductos.Domains.Response;
using ApiProductos.Models;
using ApiProductos.Respositories;
using ApiProductos.Respositories.IRepositories;
using ApiProductos.Utilities;
using Azure.Core;

namespace ApiProductos.Domains
{
    public class TransaccionDominio: Repositorio<Transaccion>, ITransaccionDominio
    {
        public IRepositorio<Transaccion> _repositorioTransaccion;
        public IRepositorio<Producto> _repositorioProducto;

        public TransaccionDominio(IRepositorio<Transaccion> repositorioTransaccion, IRepositorio<Producto> repositorioProducto, BdProductosFinancierosContext productoFinancieroContext)
            : base(productoFinancieroContext)
        {
            _repositorioTransaccion = repositorioTransaccion;
            _repositorioProducto = repositorioProducto;
        }

        public Response<int> CrearTransaccion(TransaccionRequest request)
        {
            try
            {
                var transaccionData = new Transaccion()
                {
                    IdProducto = request.IdProducto,
                    Cantidad = request.Cantidad,
                    Detalle = request.Detalle,
                    Fecha = request.Fecha,
                    PrecioTotal = request.PrecioTotal,
                    PrecioUnitario = request.PrecioUnitario,
                    TipoTransaccion = request.TipoTransaccion
                };

                ValidarProducto(transaccionData.IdProducto, transaccionData.Cantidad, transaccionData.TipoTransaccion);

                _repositorioTransaccion.Agregar(transaccionData);

                return new Response<int>() { Success = true, Data = 1 };
            }
            catch (Exception ex)
            {
                return new Response<int>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        public Response<int> EliminarTransaccion(int id)
        {
            try
            {
                var transaccionData = _repositorioTransaccion.Obtener(x => x.Id == id);
                if (transaccionData == null)
                {
                    return new Response<int>() { Error = true, Message = Constantes.MensajeTransaccionNoEncontrada };
                }
                var afectados = _repositorioTransaccion.Eliminar(transaccionData);
                return new Response<int>() { Success = true, Data = afectados };
            }
            catch (Exception ex)
            {
                return new Response<int>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        public Response<int> ModificarTransaccion(TransaccionRequest request)
        {
            try
            {
                var transaccionData = _repositorioTransaccion.Obtener(x => x.Id == request.Id);
                if (transaccionData == null)
                {
                    return new Response<int>() { Error = true, Message = Constantes.MensajeTransaccionNoEncontrada };
                }
                transaccionData.Cantidad = request.Cantidad;
                transaccionData.Detalle = request.Detalle;
                transaccionData.Fecha = request.Fecha;
                transaccionData.PrecioTotal = request.PrecioTotal;
                transaccionData.PrecioUnitario = request.PrecioUnitario;
                transaccionData.TipoTransaccion = request.TipoTransaccion;

                ValidarProducto(transaccionData.IdProducto, transaccionData.Cantidad, transaccionData.TipoTransaccion);

                var afectados = _repositorioTransaccion.Modificar(transaccionData);
                return new Response<int>() { Success = true, Data = afectados };
            }
            catch (Exception ex)
            {
                return new Response<int>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        private void ValidarProducto(int id, int cantidad, string tipoTransaccion)
        {
            var productoExistente = _repositorioProducto.Obtener(x => x.Id == id);
            if (productoExistente == null)
            {
                throw new Exception(Constantes.MensajeProductoTransaccionError);
            }

            if (tipoTransaccion.ToLower() == "compra")
                productoExistente.Stock = productoExistente.Stock + cantidad;

            if (tipoTransaccion.ToLower() == "venta")
            {
                if (productoExistente.Stock < cantidad)
                {
                    throw new Exception(Constantes.MensajeStockInsuficiente);
                }
                productoExistente.Stock = productoExistente.Stock - cantidad;
            }

            _repositorioProducto.Modificar(productoExistente);
        }

        public Response<List<Transaccion>> ObtenerTransacciones()
        {
            try
            {
                var transacciones = _repositorioTransaccion.ObtenerTodo();
                return new Response<List<Transaccion>>() { Success = true, Data = transacciones };
            }
            catch (Exception ex)
            {
                return new Response<List<Transaccion>>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        public Response<List<Transaccion>> ObtenerTransaccionPorId(int id)
        {
            try
            {
                var transacciones = _repositorioTransaccion.Filtrar(x => x.Id == id);
                return new Response<List<Transaccion>>() { Success = true, Data = transacciones };
            }
            catch (Exception ex)
            {
                return new Response<List<Transaccion>>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }
    }
}
