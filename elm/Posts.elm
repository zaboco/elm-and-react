module Posts exposing (main)

import Html exposing (..)
import Model exposing (..)
import View exposing (..)
import Update exposing (..)


apiUrl : String
apiUrl =
    "https://jsonplaceholder.typicode.com/posts?_start=24&_end=26"


main : Program Never Model Msg
main =
    Html.program
        { init = init apiUrl
        , update = (\msg model -> updateModel msg model ! [])
        , subscriptions = (\_ -> Sub.none)
        , view = view
        }
