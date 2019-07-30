module Routes exposing (..)

import Navigation exposing (Location)
import UrlParser exposing (..)


type Route
    = Login
    | Home
    | NotFound


matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map Home top
        , map Login (s "/login")
        ]


parseLocation : Location -> Route
parseLocation location =
    case (parsePath matchers location) of
        Just route ->
            route

        Nothing ->
            NotFound
