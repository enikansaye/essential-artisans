using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

//using var loggerFactory = LoggerFactory.Create(loggingBuilder => loggingBuilder
//    .SetMinimumLevel(LogLevel.Trace)
//    .AddConsole());

//ILogger logger = loggerFactory.CreateLogger<Program>();
//logger.LogInformation("Example log Jok");

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("Over18",
//        policy => policy.Requirements.Add(new Over18Requirement()));
//});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();
builder.Services.AddControllers().AddJsonOptions(x =>
    // serialize enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

//builder.Services.AddMvcCore().AddApplicationPart();


var app = builder.Build();

app.Logger.LogInformation("The app started");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Exception
//HSTS
//UseHttpsRedirection
//Staticfiles
//routhing
//Cors
//Authentication
//Authorization
//Custommiddleware
//Enpoints

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
