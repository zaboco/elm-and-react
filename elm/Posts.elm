module Posts exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Decode
import Process
import Task exposing (Task)
import Time exposing (Time)
import Types exposing (..)


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
    "https://jsonplaceholder.typicode.com/posts?_start=24&_end=26"


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
    Sub.none


view : Model -> Html Msg
view =
    postListView


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
