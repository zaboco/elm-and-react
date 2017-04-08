module Views exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode
import Types exposing (Post)


post : (Int -> msg) -> msg -> Bool -> Post -> Html msg
post onVotesChange onSelect selected { id, title, votes } =
    div
        [ classList [ ( "Post", True ), ( "selected", selected ) ]
        , onClick onSelect
        ]
        [ span [ class "Post-id" ] [ text <| toString id ]
        , span [ class "Post-title" ] [ text title ]
        , div [ class "Post-votes" ]
            [ button [ onLocalClick <| onVotesChange -1 ] [ text "-" ]
            , span [] [ text <| toString votes ]
            , button [ onLocalClick <| onVotesChange 1 ] [ text "+" ]
            ]
        ]


onLocalClick : msg -> Attribute msg
onLocalClick msg =
    let
        stopPropagtionOptions =
            { stopPropagation = True
            , preventDefault = False
            }
    in
        onWithOptions "click" stopPropagtionOptions (Decode.succeed msg)
