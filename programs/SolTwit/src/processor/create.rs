use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct TweetPlatForm<'info> {
    #[account(init, payer = user, space = 9000)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
pub fn handle_create_tweet(ctx: Context<TweetPlatForm>) -> Result<()> {
    let tweet = &mut ctx.accounts.tweet;
    tweet.likes = 0;
    tweet.message = ("").to_string();
    Ok(())
}
