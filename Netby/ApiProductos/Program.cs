using ApiProductos.Domains;
using ApiProductos.Domains.IDomains;
using ApiProductos.Models;
using ApiProductos.Respositories;
using ApiProductos.Respositories.IRepositories;
using ApiProductos.Utilities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<BdProductosFinancierosContext>(options => options.UseSqlServer(Constantes.connection(builder.Configuration),
    sqlServerOptionsAction => 
    {
        sqlServerOptionsAction.EnableRetryOnFailure();
    }));
builder.Services.AddTransient(typeof(IRepositorio<>), typeof(Repositorio<>));
builder.Services.AddScoped<ITransaccionRepositorio, TransaccionRepositorio>();
builder.Services.AddScoped<IProductoRepositorio, ProductoRepositorio>();
builder.Services.AddScoped<ITransaccionDominio, TransaccionDominio>();
builder.Services.AddScoped<IProductoDominio, ProductoDominio>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
