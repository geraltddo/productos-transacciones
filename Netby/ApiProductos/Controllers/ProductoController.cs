using ApiProductos.Domains.IDomains;
using ApiProductos.Domains.Request;
using ApiProductos.Domains.Response;
using ApiProductos.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiProductos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IProductoDominio dominioProducto;

        public ProductoController(IProductoDominio dominioProducto)
        {
            this.dominioProducto = dominioProducto;
        }

        [HttpGet("ObtenerProductos")] // api/Producto/ObtenerProductos
        public IActionResult ObtenerProductos()
        {
            return Ok(dominioProducto.ObtenerProductos());
        }

        [HttpGet("ObtenerProductoId/{id}")] // api/Producto/ObtenerProductoId/1
        public IActionResult ObtenerProducto(int id)
        {
            return Ok(dominioProducto.ObtenerProductoPorId(id));
        }

        [HttpPost("GuardarProducto")] // api/Producto/GuardarProducto
        public IActionResult GuardarProducto(ProductoRequest producto)
        {
            return Ok(dominioProducto.CrearProducto(producto));
        }

        [HttpDelete("EliminarProducto/{id}")] // api/Producto/EliminarProducto/1
        public IActionResult EliminarProducto(int id)
        {
            return Ok(dominioProducto.EliminarProducto(id));
        }

        [HttpPut("ActualizarProducto/{id}")] // api/Producto/ActualizarProducto/1
        public IActionResult ActualizarProducto(ProductoRequest producto)
        {
            return Ok(dominioProducto.ModificarProducto(producto));
        }
    }
}
