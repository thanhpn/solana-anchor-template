use anchor_lang::prelude::*;

pub use crate::errors::TweetErrors;
use crate::state::*;

#[derive(Accounts)]
pub struct LikeTweet<'info> {
    #[account(mut)]
    pub tweet_like: Account<'info, Tweet>,
}

pub fn handle_like_tweet(
    ctx: Context<LikeTweet>,
    user_like_tweet: Pubkey,
    like_action: String,
) -> Result<()> {
    let tweet = &mut ctx.accounts.tweet_like;
    if tweet.message.trim().is_empty() {
        return err!(TweetErrors::NotValidTweet);
    }

    let mut iter = tweet.people_who_liked.iter();
    if iter.any(|&v| v == user_like_tweet) {
        return err!(TweetErrors::UserLikedTweet);
    }

    tweet.likes += 1;
    tweet.people_who_liked.push(user_like_tweet);
    tweet.like_action.push(like_action);

    Ok(())
}
