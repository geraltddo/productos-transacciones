using ApiProductos.Domains.IDomains;
using ApiProductos.Domains.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiProductos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransaccionController : ControllerBase
    {
        private readonly ITransaccionDominio dominioTransaccion;

        public TransaccionController(ITransaccionDominio dominioTransaccion)
        {
            this.dominioTransaccion = dominioTransaccion;
        }

        [HttpGet("ObtenerTransacciones")] // api/Transaccion/ObtenerTransacciones
        public IActionResult ObtenerTransacciones()
        {
            return Ok(dominioTransaccion.ObtenerTransacciones());
        }

        [HttpGet("ObtenerTransaccionId/{id}")] // api/Transaccion/ObtenerTransaccionId/1
        public IActionResult ObtenerTransaccion(int id)
        {
            return Ok(dominioTransaccion.ObtenerTransaccionPorId(id));
        }

        [HttpDelete("EliminarTransaccion/{id}")] // api/Transaccion/EliminarTransaccion/1
        public IActionResult EliminarTransaccion(int id)
        {
            return Ok(dominioTransaccion.EliminarTransaccion(id));
        }

        [HttpPut("ActualizarTransaccion/{id}")] // api/Transaccion/ActualizarTransaccion/1
        public IActionResult ActualizarTransaccion(TransaccionRequest transaccion)
        {
            return Ok(dominioTransaccion.ModificarTransaccion(transaccion));
        }

        [HttpPost("GuardarTransaccion")] // api/Transaccion/GuardarTransaccion
        public IActionResult GuardarTransaccion(TransaccionRequest transaccion)
        {
            return Ok(dominioTransaccion.CrearTransaccion(transaccion));
        }
    }
}
