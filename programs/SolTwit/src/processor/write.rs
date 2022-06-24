use anchor_lang::prelude::*;

use crate::{state::*, TweetErrors};

#[derive(Accounts)]
pub struct WriteTweet<'info> {
    #[account(mut)]
    pub tweet: Account<'info, Tweet>,
}

pub fn handle_write_tweet(
    ctx: Context<WriteTweet>,
    message: String,
    user_pubkey: Pubkey,
) -> Result<()> {
    let tweet = &mut ctx.accounts.tweet;

    if message.trim().len() == 0 {
        return err!(TweetErrors::Emptymessage);
    }

    tweet.message = message;
    tweet.likes = 0;
    tweet.creator = user_pubkey;
    Ok(())
}
