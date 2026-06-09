using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres");
var database = postgres.AddDatabase("EduMgr");

var server = builder.AddProject<Fachep_EduMgr_WebHost>("server")
    .WithReference(database)
    .WaitFor(database)
    .WithOtlpExporter()
    .WithHttpHealthCheck();

var background = builder.AddProject<Fachep_EduMgr_Background>("background")
    .WithReference(database)
    .WaitFor(database)
    .WithOtlpExporter();

var client = builder.AddViteApp("client", "../Fachep.EduMgr.Frontend/packages/app", "pnpm")
    .WithExternalHttpEndpoints();

var gateway = builder.AddYarp("gateway")
    .WithHostPort(5000)
    .WithConfiguration(yarp =>
    {
        yarp.AddRoute(client);
        yarp.AddRoute("/api/{**catch-all}", server);
        yarp.AddRoute("/swagger/{**catch-all}", server);
    })
    .WithExternalHttpEndpoints();


builder.Build().Run();
