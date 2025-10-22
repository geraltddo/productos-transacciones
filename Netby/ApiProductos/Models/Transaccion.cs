using System;
using System.Collections.Generic;

namespace ApiProductos.Models;

public partial class Transaccion
{
    public int Id { get; set; }

    public int IdProducto { get; set; }

    public int Cantidad { get; set; }

    public decimal PrecioUnitario { get; set; }

    public decimal PrecioTotal { get; set; }

    public string Detalle { get; set; } = null!;

    public DateTime Fecha { get; set; }

    public string TipoTransaccion { get; set; } = null!;

    public virtual Producto IdProductoNavigation { get; set; } = null!;
}
