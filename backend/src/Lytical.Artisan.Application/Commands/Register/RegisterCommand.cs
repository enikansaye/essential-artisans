

using System.ComponentModel.DataAnnotations;

namespace Lytical.Artisan.Application.Commands.Register
{
    public class RegisterCommand : ICommand<RegisterDto>
    {
        [Required(ErrorMessage = "email is required")]
        [RegularExpression("^[a-z0-9_\\+-]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})$", ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [MaxLength(8, ErrorMessage = "Password must be at least 8 characters")]
        //[StringLength(16, ErrorMessage = "Must be between 5 and 50 characters", MinimumLength = 5)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required(ErrorMessage = "Mobile is required")]
        [RegularExpression(@"\d{10}", ErrorMessage = "Please enter 10 digit Mobile No.")]
        public string PhoneNumber { get; set; }
    }
}
