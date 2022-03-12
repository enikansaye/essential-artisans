namespace Lytical.Artisan.Domain.Entities
{
    public class RefreshToken : IEntity
    {
        protected RefreshToken() { }
        public static RefreshToken Create(Guid userUniqueId, int userId, string token, DateTime expires, string ipAddress)
        {
            return new RefreshToken
            {
                UserId = userId,
                UniqueUserId = userUniqueId,
                Token = token,
                Expires = expires,
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }
        public void ChangeRefreshToken(string ipAddress, string replacedByToken)
        {
            Changed = DateTime.UtcNow;
            ChangedByIp = ipAddress;
            Token = replacedByToken;
        }
        public Guid Id { get; protected set; }
        public Guid UniqueUserId { get; protected set; }
        public int UserId { get; protected set; }
        public string Token { get; protected set; }
        public DateTime Expires { get; protected set; }
        public DateTime Created { get; protected set; }
        public string CreatedByIp { get; set; }
        public DateTime? Changed { get; set; }
        public string ChangedByIp { get; set; }
        public bool IsExpired => DateTime.UtcNow >= Expires;
        public bool IsChanged => Changed != null;
        public bool IsActive => Changed == null && !IsExpired;

    }
}
