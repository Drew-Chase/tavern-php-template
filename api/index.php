<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../set_root.php';

use Slim\Factory\AppFactory;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

$app = AppFactory::create();
$app->addRoutingMiddleware();
$app->setBasePath("/api");
$app->addErrorMiddleware(true, true, true);

// Replace Slim's default HTML error handler with JSON
$errorMiddleware = $app->addErrorMiddleware(true, true, true);
$errorMiddleware->setDefaultErrorHandler(
    function (
        Request   $request,
        Throwable $exception,
        bool      $displayErrorDetails,
        bool      $logErrors,
        bool      $logErrorDetails
    ) use ($app): Response
    {
        $payload = [
            'error' => $exception->getMessage(),
        ];

        if ($displayErrorDetails)
        {
            $payload['stacktrace'] = $exception->getTrace();
        }

        $response = $app->getResponseFactory()->createResponse();

        $response->getBody()->write(
            json_encode($payload, JSON_PRETTY_PRINT)
        );

        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'application/json');
    }
);

$app->run();