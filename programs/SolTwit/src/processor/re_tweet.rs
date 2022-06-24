use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct ReTweet<'info> {
    #[account(mut)]
    pub tweet: Account<'info, Tweet>,
}

pub fn handle_re_tweet(
    ctx: Context<ReTweet>,
    message: String,
    user_pubkey: Pubkey,
    origin_tweet: Pubkey,
) -> Result<()> {
    let tweet = &mut ctx.accounts.tweet;
    tweet.message = message;
    tweet.creator = user_pubkey;
    tweet.origin_tweet = origin_tweet;

    Ok(())
}
