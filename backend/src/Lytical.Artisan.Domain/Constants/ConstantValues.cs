﻿namespace Lytical.Artisan.Domain.Constants
{
    public sealed class Permission
    {
        public const string READ = nameof(READ);
        public const string WRITE = nameof(WRITE);
        public const string EDIT = nameof(EDIT);
        public const string DELETE = nameof(DELETE);
    }
    public sealed class Role
    {
        public const string USER = nameof(USER);
        public const string AMIN = nameof(AMIN);
    }
}