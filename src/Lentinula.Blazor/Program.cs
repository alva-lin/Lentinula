using Lentinula.Blazor;
using Lentinula.Blazor.Extensions;

using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
var configuration = builder.Configuration;

builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Logging.AddConfiguration(configuration.GetSection("Logging"));

builder.Services.AddHttpClient();
builder.Services.AddHttpClients(configuration);

await builder.Build().RunAsync();
