module Update exposing (init, updateModel, Msg(..))

import Http
import Process
import Task exposing (Task)
import Time exposing (Time)
import Model exposing (..)


init : String -> ( Model, Cmd Msg )
init apiUrl =
    ( { posts = Nothing, selectedId = Nothing }, requestPosts apiUrl )


type Msg
    = SelectPost Id
    | ChangeVotes Id Int
    | LoadPosts (Result Http.Error Posts)


delayRequest : Time -> (Result Http.Error a -> msg) -> Http.Request a -> Cmd msg
delayRequest period handler request =
    Process.sleep period
        |> Task.andThen (\_ -> Http.toTask request)
        |> Task.attempt handler


requestPosts : String -> Cmd Msg
requestPosts apiUrl =
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

        LoadPosts (Err err) ->
            let
                _ =
                    Debug.log "err" err
            in
                { model | posts = Just [] }
