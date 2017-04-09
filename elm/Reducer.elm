port module Reducer exposing (..)

import Redux
import Json.Encode as Encode
import Model exposing (..)
import Update exposing (..)


port selectPost : ({ id : Int } -> msg) -> Sub msg


port changeVotes : ({ id : Int, delta : Int } -> msg) -> Sub msg


apiUrl : String
apiUrl =
    "https://jsonplaceholder.typicode.com/posts?_start=5&_end=7"


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ selectPost (SelectPost << Id << .id)
        , changeVotes (\{ id, delta } -> ChangeVotes (Id id) delta)
        ]


encodeModel : Model -> Encode.Value
encodeModel { posts, selectedId } =
    let
        encodePosts =
            List.map encodePost >> Encode.list
    in
        Encode.object
            [ ( "posts", maybeEncode encodePosts posts )
            , ( "selectedPostId", maybeEncode encodeId selectedId )
            ]


encodePost : Post -> Encode.Value
encodePost { id, title, votes } =
    Encode.object
        [ ( "id", encodeId id )
        , ( "title", Encode.string title )
        , ( "votes", Encode.int votes )
        ]


encodeId : Id -> Encode.Value
encodeId (Id id) =
    Encode.int id


maybeEncode : (a -> Encode.Value) -> Maybe a -> Encode.Value
maybeEncode encoder value =
    case value of
        Nothing ->
            Encode.null

        Just val ->
            encoder val


main : Program Never Model Msg
main =
    Redux.program
        { init = init apiUrl
        , update = (\msg model -> updateModel msg model ! [])
        , subscriptions = subscriptions
        , encode = encodeModel
        }
