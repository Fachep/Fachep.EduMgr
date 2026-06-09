using System.ComponentModel.DataAnnotations;
using AutoMapper;

namespace Fachep.EduMgr.WebAPI.Account.Models;

[AutoMap(typeof(UserDto), ReverseMap = true)]
public record UserProfile
{
    public string? Name { get; init; }

    [EmailAddress] public string? Email { get; init; }
}
