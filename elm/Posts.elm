module Posts exposing (main)

import Html exposing (Html)
import Types exposing (Post, initPost, changePostVotes)
import Views


type alias Model =
    { post : Post
    , selected : Bool
    }


init : ( Model, Cmd Msg )
init =
    ( { post = initPost 1 "Post 1", selected = False }, Cmd.none )


type Msg
    = SelectPost
    | ChangeVotes Int


updateModel : Msg -> Model -> Model
updateModel msg model =
    case (Debug.log "msg" msg) of
        SelectPost ->
            { model | selected = True }

        ChangeVotes delta ->
            { model | post = changePostVotes delta model.post }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


view : Model -> Html Msg
view { post, selected } =
    Views.post ChangeVotes SelectPost selected post


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = (\msg model -> updateModel msg model ! [])
        , subscriptions = subscriptions
        , view = view
        }
