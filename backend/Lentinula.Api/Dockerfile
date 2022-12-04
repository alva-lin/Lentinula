FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY  ["backend/", "."]
RUN dotnet restore "Lentinula.Api/Lentinula.Api.csproj" /ignoreprojectextensions:.dcproj

FROM build AS publish
WORKDIR "/src/Lentinula.Api"
RUN dotnet publish "Lentinula.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Lentinula.Api.dll"]
