using System;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        //[Required] - faria com que o campo fosse obrigatorio, caso estivesse vazia a api retornaria um erro
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }
}