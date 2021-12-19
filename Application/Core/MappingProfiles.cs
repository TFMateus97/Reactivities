using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();//Mapeando de uma classe para outro
            CreateMap<Activity, ActivityDTO>();
        }
    }
}