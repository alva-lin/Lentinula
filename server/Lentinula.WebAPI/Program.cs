using System.Text;

using Lentinula.WebAPI;
using Lentinula.WebAPI.IServices;
using Lentinula.WebAPI.Models;
using Lentinula.WebAPI.Services;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<LentinulaDbContext>(option =>
{
    var connectionString = builder.Configuration.GetConnectionString("LentinulaDb");
    option.UseSqlServer(connectionString);
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policyBuilder =>
    {
        policyBuilder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

builder.Services.Configure<TokenManagement>(builder.Configuration.GetSection("tokenManagement"));
var token  = builder.Services.BuildServiceProvider().GetService<IOptions<TokenManagement>>();
var secret = Encoding.ASCII.GetBytes(token!.Value.Secret);

builder.Services.AddAuthentication(x =>
    {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme    = JwtBearerDefaults.AuthenticationScheme;
    })
   .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken            = true;

        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey         = new SymmetricSecurityKey(secret),
            ValidateIssuer           = false,
            ValidateAudience         = false
        };
    });

builder.Services.AddScoped<IAuthenticateService, TokenAuthenticationService>();
builder.Services.AddScoped<IAccountService, AccountService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
