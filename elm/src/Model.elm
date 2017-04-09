module Model exposing (..)

import Json.Decode as Decode exposing (Decoder)


type alias Model =
    { posts : Maybe Posts
    , selectedId : Maybe Id
    }


type Id
    = Id Int


idToString : Id -> String
idToString (Id id) =
    toString id


type alias Post =
    { id : Id
    , title : String
    , votes : Int
    }


type alias Posts =
    List Post


initPost : Int -> String -> Post
initPost id title =
    Post (Id id) title 0


changePostVotes : Int -> Post -> Post
changePostVotes delta post =
    { post | votes = post.votes + delta }


updatePostWithId : Id -> (Post -> Post) -> List Post -> List Post
updatePostWithId id update posts =
    let
        updateIfNeeded post =
            if post.id == id then
                update post
            else
                post
    in
        List.map updateIfNeeded posts


postsDecoder : Decoder (List Post)
postsDecoder =
    Decode.list postDecoder


postDecoder : Decoder Post
postDecoder =
    Decode.map2 initPost
        (Decode.field "id" Decode.int)
        (Decode.field "title" Decode.string)
