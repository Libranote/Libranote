module Router exposing (..)

import Html exposing (..)
import Common


type alias Model =
    { route : String
    }


init : Model
init =
    { route = "/" }
