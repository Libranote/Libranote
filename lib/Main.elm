module Main exposing (..)

import Navigation exposing (..)
import Router.View
import Router.Model
import Common exposing (..)


update : Msg -> Model -> Model
update msg model =
    case msg of
        Router r ->
            { model | router = Router.update r model }


view : Model -> Html Msg
view model =
    Router.route model


init : Model
init =
    { router = Router.init, user = { loggedIn = False } }


main =
    Navigation.program (\locationNavigation -> _) { init = \locationNavigation -> ( _, _ ), update = \msg model -> ( _, _ ), view = \model -> _, subscriptions = \model -> _ }
    Html.beginnerProgram { model = init, view = view, update = update }
