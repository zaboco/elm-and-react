port module Reducer exposing (..)

import Redux
import Http
import Json.Encode as Encode
import Process
import Task exposing (Task)
import Time exposing (Time)
import Types exposing (..)


port selectPost : ({ id : Int } -> msg) -> Sub msg


port changeVotes : ({ id : Int, delta : Int } -> msg) -> Sub msg


type alias Posts =
    List Post


type alias Model =
    { posts : Maybe Posts
    , selectedId : Maybe Id
    }


init : ( Model, Cmd Msg )
init =
    ( { posts = Nothing, selectedId = Nothing }, requestPosts )


type Msg
    = SelectPost Id
    | ChangeVotes Id Int
    | LoadPosts (Result Http.Error Posts)


delayRequest : Time -> (Result Http.Error a -> msg) -> Http.Request a -> Cmd msg
delayRequest period handler request =
    Process.sleep period
        |> Task.andThen (\_ -> Http.toTask request)
        |> Task.attempt handler


apiUrl : String
apiUrl =
    "https://jsonplaceholder.typicode.com/posts?_start=5&_end=7"


requestPosts : Cmd Msg
requestPosts =
    delayRequest 700 LoadPosts <| Http.get apiUrl postsDecoder


updateModel : Msg -> Model -> Model
updateModel msg model =
    case msg of
        SelectPost id ->
            { model | selectedId = Just id }

        ChangeVotes id delta ->
            let
                updatePost =
                    updatePostWithId id (changePostVotes delta)
            in
                { model | posts = Maybe.map updatePost model.posts }

        LoadPosts (Ok posts) ->
            if List.isEmpty posts then
                { posts = Just [], selectedId = Nothing }
            else
                { posts = Just posts, selectedId = Maybe.map .id <| List.head posts }

        LoadPosts (Err _) ->
            { model | posts = Just [] }


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
        { init = init
        , update = (\msg model -> updateModel msg model ! [])
        , subscriptions = subscriptions
        , encode = encodeModel
        }
