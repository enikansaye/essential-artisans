using System.Globalization;
using System.Text.RegularExpressions;

namespace Lytical.Artisan.Domain.Extensions
{
    public static class StringExtension
    {
        public static string ToTitleCase(this string strText)
        {
            return new CultureInfo("en-US").TextInfo.ToTitleCase(strText.ToLower());
        }
        public static string FirstCharToUpper(this string input) =>
        input switch
        {
            null => throw new ArgumentNullException(nameof(input)),
            "" => throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input)),
            _ => string.Concat(input[0].ToString().ToUpper(), input.AsSpan(1))
        };

        public static bool FastCompare(this string textA, string textB, bool ignoreCase = true)
        {
            return string.Compare(textA, textB, ignoreCase) == 0;
        }
        public static bool IsValidString(this string text)
        {
            return !text.IsNotValidString();
        }

        public static bool IsNotValidString(this string text)
        {
            return string.IsNullOrWhiteSpace(text) || string.IsNullOrEmpty(text);
        }

        public static bool IsValidEmailString(this string emailString)
        {
            if (emailString == null) return false;

            var patternRule = @"^[\w!#$%&'*+\-/=?\^_`{|}~]+(\.[\w!#$%&'*+\-/=?\^_`{|}~]+)*"
                                   + "@"
                                   + @"((([\-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))\z";
            return new Regex(patternRule)
                      .IsMatch(emailString);
        }

        public static bool IsNotValidEmailString(this string emailString)
        {
            return !emailString.IsValidEmailString();
        }
    }
}
