use anchor_lang::prelude::*;

use crate::write::*;
use crate::{state::*, TweetErrors};

#[derive(AnchorSerialize, AnchorDeserialize, Debug)]
pub struct Photo {
    pub url: String,
    pub caption: String,
}

pub fn handle_write_photo_tweet(
    ctx: Context<WriteTweet>,
    message: String,
    user_pubkey: Pubkey,
    photo: Photo,
) -> Result<()> {
    let tweet = &mut ctx.accounts.tweet;

    if message.trim().len() == 0 {
        return err!(TweetErrors::Emptymessage);
    }

    tweet.message = message;
    tweet.likes = 0;
    tweet.creator = user_pubkey;
    tweet.photo_url = photo.url;
    tweet.caption = photo.caption;
    Ok(())
}
