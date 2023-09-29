using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    // Anotations to add plural in the naming of the sql table
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }
        //relations to force cascade on delete with migrations creation
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}