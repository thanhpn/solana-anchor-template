use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Initialize {}

#[account]
#[derive(Default)]
pub struct Tweet {
    pub message: String,
    pub likes: u8,
    pub creator: Pubkey,
    pub origin_tweet: Pubkey,
    pub people_who_liked: Vec<Pubkey>,
    pub like_action: Vec<String>,
}

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub name: String,
    pub avatar_url: String,
    pub owner: Pubkey,
    pub status: String,
}

// #[derive(Accounts)]
// pub struct TweetPlatForm<'info> {
//     #[account(init, payer = user, space = 9000)]
//     pub tweet: Account<'info, Tweet>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct ReTweet<'info> {
//     #[account(mut)]
//     pub tweet: Account<'info, Tweet>,
// }

#[derive(Accounts)]
pub struct UserProfileAccount<'info> {
    #[account(init, payer = user, space = 9000)]
    pub profile: Account<'info, UserProfile>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
