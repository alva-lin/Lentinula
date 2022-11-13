FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/Lentinula.Blazor.Wasm/Lentinula.Blazor.Wasm.csproj", "src/Lentinula.Blazor.Wasm/"]
RUN dotnet restore "src/Lentinula.Blazor.Wasm/Lentinula.Blazor.Wasm.csproj"
COPY . .
WORKDIR "/src/src/Lentinula.Blazor.Wasm"
RUN dotnet build "Lentinula.Blazor.Wasm.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Lentinula.Blazor.Wasm.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Lentinula.Blazor.Wasm.dll"]
