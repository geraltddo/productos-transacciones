using ApiProductos.Models;
using ApiProductos.Respositories.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ApiProductos.Respositories
{
    public class Repositorio<T>: IRepositorio<T> where T : class
    {
        private readonly BdProductosFinancierosContext productoFinancieroContext;
        public Repositorio(BdProductosFinancierosContext db)
        {
            this.productoFinancieroContext = db!;
        }

        protected DbSet<T> Query => this.productoFinancieroContext.Set<T>();


        public List<T> Filtrar(Expression<Func<T, bool>> predicate)
        {
            var query = this.Query.Where(predicate);
            return query.ToList();
        }

        public List<T> ObtenerTodo()
        {
            return Query.ToList();
        }

        public void Agregar(T entity)
        {
            Query.Add(entity);
            Guardar();
        }

        public int Modificar(T entity)
        {
            productoFinancieroContext.Entry(entity).State = EntityState.Modified;
            return Guardar();
        }

        public int Eliminar(T entity)
        {
            productoFinancieroContext.Set<T>().Remove(entity);
            return Guardar();
        }

        public int Guardar()
        {
            return productoFinancieroContext.SaveChanges();
        }

        public bool Existe(Expression<Func<T, bool>> predicate)
        {
            return Query.Any(predicate);
        }

        public T? Obtener(Expression<Func<T, bool>> predicate)
        {
            return Query.Where(predicate).FirstOrDefault();
        }

        public int Contar()
        {
            return Query.Count();
        }
    }

    public class FindOptions
    {
        public bool IsIgnoreAutoIncludes { get; set; }
        public bool IsAsNoTracking { get; set; }
    }
}
