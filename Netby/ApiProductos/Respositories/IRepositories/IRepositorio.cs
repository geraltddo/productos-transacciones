using System.Linq.Expressions;

namespace ApiProductos.Respositories.IRepositories
{
    public interface IRepositorio<TEntity> where TEntity : class
    {
        List<TEntity> ObtenerTodo();
        void Agregar(TEntity entity);
        int Modificar(TEntity entity);
        int Eliminar(TEntity entity);
        int Guardar();
        List<TEntity> Filtrar(Expression<Func<TEntity, bool>> predicate);
        bool Existe(Expression<Func<TEntity, bool>> predicate);
        TEntity? Obtener(Expression<Func<TEntity, bool>> predicate);
        int Contar();
    }
}
