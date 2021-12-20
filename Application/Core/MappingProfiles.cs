using System.Linq;
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
            CreateMap<Activity, ActivityDTO>()
                .ForMember(d => d.HostUsername,
                           o => o.MapFrom(s => s.Attendees
                                        .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>().ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));
            CreateMap<ActivityAttendee, Profiles.Profile>().ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.UserName));
            CreateMap<ActivityAttendee, Profiles.Profile>().ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}