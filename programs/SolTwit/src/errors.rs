use anchor_lang::prelude::*;

#[error_code]
pub enum TweetErrors {
    #[msg("Tweet message cannot be updated")]
    CannotUpdateTweet,

    #[msg("Message empty")]
    Emptymessage,

    #[msg("Max like")]
    ReachedMaxLikes,

    #[msg("Not valid message")]
    NotValidTweet,

    #[msg("user has already liked tweet")]
    UserLikedTweet,

    #[msg("user profile has already created")]
    ProfileExisted,
}
