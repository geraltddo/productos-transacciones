using System;
using System.Collections.Generic;

namespace ApiProductos.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public string Categoria { get; set; } = null!;

    public string Imagen { get; set; } = null!;

    public decimal Precio { get; set; }

    public int Stock { get; set; }

    public virtual ICollection<Transaccion> Transaccions { get; set; } = new List<Transaccion>();
}
