using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookInventoryManagement.Repositories;
using BookInventoryManagement.Models;
using AutoMapper;
using BookInventoryManagement.DTOs;
using Microsoft.AspNetCore.JsonPatch;

namespace BookInventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IMapper _mapper;

        public InventoryController(IInventoryRepository inventoryRepository, IMapper mapper)
        {
            _inventoryRepository = inventoryRepository;
            _mapper = mapper;
        }

        // GET: api/Inventory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryDTO>>> GetAllInventory()
        {
            var inventory = await _inventoryRepository.GetAllInventoryAsync();
            var inventoryDTOs = _mapper.Map<IEnumerable<InventoryDTO>>(inventory);
            return Ok(inventoryDTOs);
        }

        // GET: api/Inventory/5
        [HttpGet("{id}")]
       
        public async Task<ActionResult<InventoryDTO>> GetInventoryById(int id)
        {
            var inventory = await _inventoryRepository.GetInventoryByIdAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }
            var inventoryDTO = _mapper.Map<InventoryDTO>(inventory);
            return Ok(inventoryDTO);
        }

        // POST: api/Inventory
        [HttpPost]
        public async Task<ActionResult<InventoryDTO>> CreateInventory(CreateInventoryDTO createInventoryDTO)
        {
            var inventory = _mapper.Map<Inventory>(createInventoryDTO);
            await _inventoryRepository.AddInventoryAsync(inventory);
            var inventoryDTO = _mapper.Map<InventoryDTO>(inventory);
            return CreatedAtAction(nameof(GetInventoryById), new { id = inventory.Id }, inventoryDTO);
        }

        // PUT: api/Inventory/5
        [HttpPut("{id}")]
        
        public async Task<IActionResult> UpdateInventory(int id, UpdateInventoryDTO updateInventoryDTO)
        {
            var inventory = await _inventoryRepository.GetInventoryByIdAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }
            _mapper.Map(updateInventoryDTO, inventory);
            await _inventoryRepository.UpdateInventoryAsync(inventory);
            return NoContent();
        }

       
        // DELETE: api/Inventory/id
        [HttpDelete("{id}")]
      
        public async Task<IActionResult> DeleteInventory(int id)
        {
            await _inventoryRepository.DeleteInventoryAsync(id);
            return NoContent();
        }

        // PATCH: api/Inventory/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchInventory(int id, [FromBody] JsonPatchDocument<InventoryPatchDTO> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Invalid patch document.");
            }

            var inventory = await _inventoryRepository.GetInventoryByIdAsync(id);
            if (inventory == null)
            {
                return NotFound($"Inventory with ID {id} not found.");
            }

            var inventoryPatchDTO = new InventoryPatchDTO
            {
                Quantity = inventory.Quantity,
                Price = inventory.Price
            };

            patchDoc.ApplyTo(inventoryPatchDTO, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Apply the changes to the actual inventory entity
            inventory.Quantity = inventoryPatchDTO.Quantity ?? inventory.Quantity;
            inventory.Price = inventoryPatchDTO.Price ?? inventory.Price;

            await _inventoryRepository.UpdateInventoryAsync(inventory);

            return NoContent();
        }
    }
}
