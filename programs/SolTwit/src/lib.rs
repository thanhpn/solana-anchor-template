pub mod errors;
pub mod processor;
pub mod state;

use anchor_lang::prelude::*;
pub use errors::TweetErrors;
pub use processor::*;
pub use state::*;

declare_id!("E2VQmP1K25xsjDoSYHdx729f3EE7Mbho3ZkSYg8DVwhU");

#[program]
pub mod sol_twit {
    use super::*;

    pub fn setup_tweeter(ctx: Context<TweetPlatForm>) -> Result<()> {
        handle_create_tweet(ctx)
    }

    pub fn write_tweet(
        ctx: Context<WriteTweet>,
        message: String,
        user_pubkey: Pubkey,
    ) -> Result<()> {
        handle_write_tweet(ctx, message, user_pubkey)
    }

    pub fn write_photo_tweet(
        ctx: Context<WriteTweet>,
        message: String,
        user_pubkey: Pubkey,
        photo: Photo,
    ) -> Result<()> {
        handle_write_photo_tweet(ctx, message, user_pubkey, photo)
    }

    pub fn like_tweet(
        ctx: Context<LikeTweet>,
        user_like_tweet: Pubkey,
        like_action: String,
    ) -> Result<()> {
        handle_like_tweet(ctx, user_like_tweet, like_action)
    }

    pub fn re_tweet(
        ctx: Context<ReTweet>,
        message: String,
        user_pubkey: Pubkey,
        origin_tweet: Pubkey,
    ) -> Result<()> {
        handle_re_tweet(ctx, message, user_pubkey, origin_tweet)
    }

    pub fn create_profile(
        ctx: Context<UserProfileAccount>,
        name: String,
        avatar: String,
        bio: String,
    ) -> Result<()> {
        handle_create_profile(ctx, name, avatar, bio)
    }

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}
