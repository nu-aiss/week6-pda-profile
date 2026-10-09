use anchor_lang::prelude::*;

declare_id!("39vimUADokcHsWfHD7VXrNqX6MJdunAbnG3XX1vvr6q3");

#[program]
pub mod week6_pda_profile {
    use super::*;

    pub fn create_profile(
        ctx: Context<CreateProfile>,
        name: String,
        bio: String,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.profile;

        profile.owner = ctx.accounts.user.key();
        profile.name = name;
        profile.bio = bio;
        profile.bump = ctx.bumps.profile;

        msg!("Profile created successfully!");
        msg!("Owner: {}", profile.owner);
        msg!("Name: {}", profile.name);
        msg!("Bio: {}", profile.bio);

        Ok(())
    }

    pub fn update_profile(
        ctx: Context<UpdateProfile>,
        name: String,
        bio: String,
    ) -> Result<()> {
        let profile = &mut ctx.accounts.profile;

        profile.name = name;
        profile.bio = bio;

        msg!("Profile updated successfully!");
        msg!("New name: {}", profile.name);
        msg!("New bio: {}", profile.bio);

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateProfile<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + Profile::INIT_SPACE,
        seeds = [b"profile", user.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, Profile>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        seeds = [b"profile", user.key().as_ref()],
        bump = profile.bump,
        constraint = profile.owner == user.key()
    )]
    pub profile: Account<'info, Profile>,

    pub user: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct Profile {
    pub owner: Pubkey,

    #[max_len(50)]
    pub name: String,

    #[max_len(200)]
    pub bio: String,

    pub bump: u8,
}