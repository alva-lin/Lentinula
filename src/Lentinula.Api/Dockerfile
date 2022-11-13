FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY  ["src/", "."]
# COPY ["Lentinula.WebAPI/Lentinula.WebAPI.csproj", "Lentinula.WebAPI/"]
RUN dotnet restore "Lentinula.Api/Lentinula.Api.csproj"
COPY . .
WORKDIR "/src/Lentinula.Api"
RUN dotnet build "Lentinula.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Lentinula.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Lentinula.Api.dll"]
