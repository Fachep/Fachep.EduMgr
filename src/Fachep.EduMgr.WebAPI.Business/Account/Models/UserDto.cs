using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Fachep.EduMgr.Entities;

namespace Fachep.EduMgr.WebAPI.Account.Models;

[AutoMap(typeof(User), ReverseMap = true)]
public record UserDto : UserProfile
{
    [Required] public required long Id { get; init; }

    [Required] public required UserRole UserRole { get; init; }
}
