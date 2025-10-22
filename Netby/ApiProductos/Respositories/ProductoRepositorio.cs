using ApiProductos.Models;
using ApiProductos.Respositories.IRepositories;

namespace ApiProductos.Respositories
{
    public class ProductoRepositorio: Repositorio<Producto>, IProductoRepositorio
    {
        public ProductoRepositorio(BdProductosFinancierosContext context) : base(context) { }
    }
}
