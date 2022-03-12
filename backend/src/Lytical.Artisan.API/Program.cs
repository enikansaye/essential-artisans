var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(x =>
    // serialize enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();
builder.AddArtisanServices();

var app = builder.Build();

app.Logger.LogInformation("The app started");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
    app.UseArtisanSwagger();

app.UseMiddleware<ErrorMiddleware>();
app.UseHsts();
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseRouting();
app.UseArtisanCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<JwtMiddleware>();
app.MapControllers();
app.Run();

//Exception
//HSTS
//UseHttpsRedirection
//Staticfiles
//routhing
//Cors
//Authentication
//Authorization
//Custommiddleware
//MapEnpoints/MapControllers
//Run
app.Logger.LogInformation("Application successfully configured.");
