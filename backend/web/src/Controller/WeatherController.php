<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;

class WeatherController extends AbstractController
{
    /**
     * @Route("/api/weather", name="get_weather", methods={"GET"})
     */
    public function getWeather(Request $request): JsonResponse
    {
        $location = $request->query->get('location');

        $client = new Client();
        $response = $client->request('GET', 'http://api.openweathermap.org/data/2.5/weather', [
            'query' => [
                'q' => $location,
                'appid' => $_ENV['OPENWEATHER_API_KEY'],
            ],
        ]);

        if ($response->getStatusCode() !== 200) {
            return $this->json(['error' => 'API request failed with status code: ' . $response->getStatusCode()], 500);
        }

        $weatherData = json_decode($response->getBody()->getContents(), true);

        return $this->json($weatherData);
    }
}
