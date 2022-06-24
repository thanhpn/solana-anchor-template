use anchor_lang::prelude::*;

use crate::state::*;

pub fn handle_create_profile(
    ctx: Context<UserProfileAccount>,
    name: String,
    avatar: String,
    bio: String,
) -> Result<()> {
    let profile = &mut ctx.accounts.profile;
    profile.name = name;
    profile.avatar_url = avatar;
    profile.status = bio;
    Ok(())
}
