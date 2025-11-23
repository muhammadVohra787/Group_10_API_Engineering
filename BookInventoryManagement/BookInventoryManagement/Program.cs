using BookInventoryManagement.Data;
using BookInventoryManagement.Repositories;
using BookInventoryManagement.Scripts;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var ConnectionString = builder.Configuration.GetConnectionString("Default");
if (!builder.Environment.IsDevelopment())
{
    ConnectionString= builder.Configuration.GetConnectionString("Production");
}
// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(ConnectionString));

builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
});

// Add CORS policy to allow any origin
builder.Services.AddCors(options =>
{
    // CORS managed by APIGEE in production, allowing all origins here for development purposes
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .AllowAnyOrigin() // Allow any origin
            .AllowAnyHeader() // Allow any HTTP header
            .AllowAnyMethod(); // Allow any HTTP method
    });
});

builder.Services.AddScoped<IInventoryRepository, InventoryRepository>();
builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IBookDetailsRepository, BookDetailsRepository>();



// Add AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Use the CORS policy
app.UseCors("CorsPolicy");

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();

    try
    {
        await DataSeeder.SeedAsync(db);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred during database seeding");
    }
}



app.Run();
