
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using TestsWebApp.Extentsions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureCors();
builder.Services.ConfigureIISIntegration();
builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.ConfigureDaraShaper();
builder.Services.ConfigureSqlContext(builder.Configuration);

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddControllers();


//builder.Services.AddControllers(config =>
//{
//    config.RespectBrowserAcceptHeader = true;
//    config.ReturnHttpNotAcceptable = true;
//    config.InputFormatters.Insert(0, GetJsonPatchInputFormatter());
//}).AddXmlDataContractSerializerFormatters();

var app = builder.Build();


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.All
});
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
