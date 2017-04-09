module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode
import Model exposing (..)
import Update exposing (..)


view : Model -> Html Msg
view =
    postListView


postListView : Model -> Html Msg
postListView { posts, selectedId } =
    let
        contents =
            case posts of
                Nothing ->
                    [ loadingStateView ]

                Just [] ->
                    [ emptyStateView ]

                Just posts ->
                    List.map (postView selectedId) posts
    in
        div [ class "PostList" ] contents


postView : Maybe Id -> Post -> Html Msg
postView selectedId { id, title, votes } =
    div
        [ classList [ ( "Post", True ), ( "selected", selectedId == Just id ) ]
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


onLocalClick : msg -> Attribute msg
onLocalClick msg =
    let
        stopPropagtionOptions =
            { stopPropagation = True
            , preventDefault = False
            }
    in
        onWithOptions "click" stopPropagtionOptions (Decode.succeed msg)
