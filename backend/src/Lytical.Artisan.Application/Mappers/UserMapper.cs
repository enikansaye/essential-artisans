using Lytical.Artisan.Domain.Entities;
using Lytical.Artisan.Application.Commands.UpdateUser;

namespace Lytical.Artisan.Application.Mappers
{
    public static class UserMapper
    {
        public static UpdateUserDto ToUserDto(this User user)
        {
            return new UpdateUserDto
            {
                Name = user.FullName,
            };
        }

        public static IEnumerable<UpdateUserDto> ToUserDtos(this IEnumerable<User> users)
        {
            foreach (var user in users)
                yield return ToUserDto(user);
        }
    }
}
