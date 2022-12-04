using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;

using Lentinula.Api.Common;
using Lentinula.Api.Extensions;
using Lentinula.Core;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ModelValidFilter>();
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.ReferenceHandler     = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.Encoder              = JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
    options.JsonSerializerOptions.WriteIndented        = true;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.DocumentFilter<JsonPatchDocumentFilter>();
    options.IncludeAllXmlComments();
});

builder.Services.AddTransient(typeof(Lazy<>));
builder.Services.AddHttpContextAccessor();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
builder.Services.AddCorsSetting(configuration);
builder.Services.AddJwtBearer(configuration);

builder.Services.AddDbContext<LentinulaDbContext>(option =>
{
    option.UseNpgsql(configuration.GetConnectionString("Lentinula"));
});
builder.Services.AddBasicServiceByLifeScope();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseBasicException();
app.UseCors();
// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
