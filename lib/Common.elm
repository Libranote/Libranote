module Common exposing (..)


type alias UserModel =
    { loggedIn : Bool }


type alias Model =
    { router : Router.Model
    , user : UserModel
    }


type Msg
    = Router Router.Msg
