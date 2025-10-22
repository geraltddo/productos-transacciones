using ApiProductos.Domains.IDomains;
using ApiProductos.Domains.Request;
using ApiProductos.Domains.Response;
using ApiProductos.Models;
using ApiProductos.Respositories;
using ApiProductos.Respositories.IRepositories;
using ApiProductos.Utilities;

namespace ApiProductos.Domains
{
    public class ProductoDominio : Repositorio<Producto>, IProductoDominio
    {
        public IRepositorio<Producto> _repositorioProducto;

        public ProductoDominio(IRepositorio<Producto> repositorioProducto, BdProductosFinancierosContext productoFinancieroContext) 
            :base(productoFinancieroContext)
        {
            _repositorioProducto = repositorioProducto;
        }
        public Response<int> CrearProducto(ProductoRequest request)
        {
            try
            {
                var productoData = new Producto()
                {
                    Categoria = request.Categoria,
                    Descripcion = request.Descripcion!,
                    Imagen = request.Imagen,
                    Nombre = request.Nombre!,
                    Precio = request.Precio,
                    Stock = request.Stock
                };
                _repositorioProducto.Agregar(productoData);
                return new Response<int>() { Success = true, Data = 1 };
            }
            catch (Exception ex)
            {
                return new Response<int>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        public Response<int> EliminarProducto(int id)
        {
            try
            {
                var productoData = _repositorioProducto.Obtener(x => x.Id == id);
                if (productoData == null)
                {
                    return new Response<int>() { Error = true, Message = Constantes.MensajeProductoNoEncontrado };
                }
                var afectados = _repositorioProducto.Eliminar(productoData);
                return new Response<int>() { Success = true, Data = afectados };
            }
            catch (Exception ex)
            {
                return new Response<int>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        public Response<int> ModificarProducto(ProductoRequest request)
        {
            try
            {
                var productoData = _repositorioProducto.Obtener(x => x.Id == request.Id);
                if (productoData == null)
                {
                    return new Response<int>() { Error = true, Message = Constantes.MensajeProductoNoEncontrado };
                }
                productoData.Categoria = request.Categoria;
                productoData.Descripcion = request.Descripcion!;
                productoData.Imagen = request.Imagen;
                productoData.Nombre = request.Nombre!;
                productoData.Precio = request.Precio;
                productoData.Stock = request.Stock;
                var afectados = _repositorioProducto.Modificar(productoData);
                return new Response<int>() { Success = true, Data = afectados };
            }
            catch (Exception ex)
            {
                return new Response<int>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        public Response<List<Producto>> ObtenerProductos()
        {
            try
            {
                var productos = _repositorioProducto.ObtenerTodo();
                return new Response<List<Producto>>() { Success = true, Data = productos };
            }
            catch (Exception ex)
            {
                return new Response<List<Producto>>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }

        public Response<List<Producto>> ObtenerProductoPorId(int id)
        {
            try
            {
                var productos = _repositorioProducto.Filtrar(x => x.Id == id);
                return new Response<List<Producto>>() { Success = true, Data = productos };
            }
            catch (Exception ex)
            {
                return new Response<List<Producto>>() { Error = true, Message = $"{Constantes.MensajeError} {ex.Message}" };
            }
        }
    }
}
