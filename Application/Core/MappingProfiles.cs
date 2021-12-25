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
            CreateMap<Activity, ActivityDTO>().ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                                        .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee, AttendeeDTO>().ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                                                        .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                                                        .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                                                        .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}