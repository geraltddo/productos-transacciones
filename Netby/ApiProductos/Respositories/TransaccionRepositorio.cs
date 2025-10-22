using ApiProductos.Models;
using ApiProductos.Respositories.IRepositories;

namespace ApiProductos.Respositories
{
    public class TransaccionRepositorio: Repositorio<Transaccion>, ITransaccionRepositorio
    {
        public TransaccionRepositorio(BdProductosFinancierosContext context) : base(context) { }
    }
}
