using System;
using System.Collections.Generic;
using ApiProductos.Utilities;
using Microsoft.EntityFrameworkCore;

namespace ApiProductos.Models;

public partial class BdProductosFinancierosContext : DbContext
{
    private readonly IConfiguration _config;

    public BdProductosFinancierosContext(DbContextOptions<BdProductosFinancierosContext> options, IConfiguration config)
        : base(options)
    {
        _config = config;
    }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Transaccion> Transaccions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(Constantes.connection(_config));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3213E83F0868C120");

            entity.ToTable("Producto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Categoria)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("categoria");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Imagen)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("imagen");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precio");
            entity.Property(e => e.Stock).HasColumnName("stock");
        });

        modelBuilder.Entity<Transaccion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Transacc__3213E83FC554EE0F");

            entity.ToTable("Transaccion");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            entity.Property(e => e.Detalle)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("detalle");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            entity.Property(e => e.PrecioTotal)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precioTotal");
            entity.Property(e => e.PrecioUnitario)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precioUnitario");
            entity.Property(e => e.TipoTransaccion)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipoTransaccion");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.Transaccions)
                .HasForeignKey(d => d.IdProducto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacci__idPro__47DBAE45");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
