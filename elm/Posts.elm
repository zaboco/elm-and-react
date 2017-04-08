module Posts exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode
import Types exposing (..)


type alias Model =
    { posts : List Post
    , selectedId : Id
    }


init : ( Model, Cmd Msg )
init =
    ( { posts = [ initPost 1 "Post 1", initPost 2 "Post 2" ], selectedId = Id 1 }, Cmd.none )


type Msg
    = SelectPost Id
    | ChangeVotes Id Int


updateModel : Msg -> Model -> Model
updateModel msg model =
    case (Debug.log "msg" msg) of
        SelectPost id ->
            { model | selectedId = id }

        ChangeVotes id delta ->
            { model | posts = updatePostWithId id (changePostVotes delta) model.posts }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


view : Model -> Html Msg
view =
    postListView


postView : Id -> Post -> Html Msg
postView selectedId { id, title, votes } =
    div
        [ classList [ ( "Post", True ), ( "selected", id == selectedId ) ]
        , onClick (SelectPost id)
        ]
        [ span [ class "Post-id" ] [ text <| idToString id ]
        , span [ class "Post-title" ] [ text title ]
        , div [ class "Post-votes" ]
            [ button [ onLocalClick <| ChangeVotes id -1 ] [ text "-" ]
            , span [] [ text <| toString votes ]
            , button [ onLocalClick <| ChangeVotes id 1 ] [ text "+" ]
            ]
        ]


loadingStateView : Html msg
loadingStateView =
    div [ class "PostList-loading" ] [ text "Loading Posts..." ]


emptyStateView : Html msg
emptyStateView =
    div [ class "PostList-empty" ] [ text "No Posts" ]


postListView : Model -> Html Msg
postListView { posts, selectedId } =
    let
        contents =
            if List.isEmpty posts then
                [ emptyStateView ]
            else
                List.map (postView selectedId) posts
    in
        div [ class "PostList" ] contents


onLocalClick : msg -> Attribute msg
onLocalClick msg =
    let
        stopPropagtionOptions =
            { stopPropagation = True
            , preventDefault = False
            }
    in
        onWithOptions "click" stopPropagtionOptions (Decode.succeed msg)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = (\msg model -> updateModel msg model ! [])
        , subscriptions = subscriptions
        , view = view
        }
