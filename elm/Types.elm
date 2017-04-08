module Types exposing (..)


type alias Post =
    { id : Int
    , title : String
    , votes : Int
    }


initPost : Int -> String -> Post
initPost id title =
    Post id title 0


changePostVotes : Int -> Post -> Post
changePostVotes delta post =
    { post | votes = post.votes + delta }



{-
   export type PostType = {
     id: number,
     title: string,
     votes: number,
   };

   export type PostArrayType = Array<PostType>;

   export type AppState = {
     posts: ?PostArrayType,
     selectedPostId: number,
   };

-}
