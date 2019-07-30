module Router exposing (..)

import Html
import Common


view : Common.Model -> Html Msg
view model =
    case model.router.route of
        "/" ->
            if model.user.loggedIn then
                p [] [ text "connected" ]
            else
                p [] [ text "not connected" ]
