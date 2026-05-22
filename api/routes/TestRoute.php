<?php

namespace routes;

use Slim\App;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Slim\Routing\RouteCollectorProxy;

class TestRoute
{
    static function index(Request $request, Response $response, $args): Response
    {
        $env = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . "/.env");
        $response->getBody()->write(json_encode(["message" => "Message from the API", "env" => $env]));

        return $response
            ->withStatus(200)
            ->withHeader('Content-Type', 'application/json');
    }

    static function configure(App $app): void
    {
        $app->group("/test", function (RouteCollectorProxy $group)
        {
            $group->get("/", [self::class, 'index']);
        });
    }
}