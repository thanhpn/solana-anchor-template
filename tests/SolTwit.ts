import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolTwit } from "../target/types/sol_twit";
import { expect, assert } from 'chai';

describe("SolTwit", () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.Provider.env());

    const program = anchor.workspace.SolTwit as Program<SolTwit>;

    // it("Is initialized!", async () => {
    //     // Add your test here.
    //     const tx = await program.rpc.initialize({});
    //     console.log("Your transaction signature", tx);
    // });

    // it('setup new tweet!', async () => {
    //     const tweetKeypair = anchor.web3.Keypair.generate();
    //     const user = program.provider.wallet;
    //     await program.rpc.setupTweeter({
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //             user: user.publicKey,
    //             systemProgram: anchor.web3.SystemProgram.programId
    //         },
    //         signers: [tweetKeypair]
    //     });

    //     let tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('');
    // });

    // it('Write a tweet', async () => {
    //     const tweetKeypair = anchor.web3.Keypair.generate();
    //     const user = program.provider.wallet;
    //     console.log("Account write tweet:", tweetKeypair.publicKey.toBase58());

    //     await program.rpc.setupTweeter({
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //             user: user.publicKey,
    //             systemProgram: anchor.web3.SystemProgram.programId
    //         },
    //         signers: [tweetKeypair]
    //     });

    //     let tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('');

    //     await program.rpc.writeTweet('Hello World!', user.publicKey, {
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //         },
    //         signers: []
    //     });

    //     tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);

    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('Hello World!');
    //     expect(tweet.creator.toString()).to.equal(user.publicKey.toString());
    // });


    it('Write a photo tweet', async () => {
        const tweetKeypair = anchor.web3.Keypair.generate();
        const user = program.provider.wallet;
        console.log("Account write new tweet:", tweetKeypair.publicKey.toBase58());

        await program.rpc.setupTweeter({
            accounts: {
                tweet: tweetKeypair.publicKey,
                user: user.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId
            },
            signers: [tweetKeypair]
        });

        await program.rpc.writePhotoTweet('Hello World!', user.publicKey,
            { url: "", caption: "great photo!" },
            {
                accounts: {
                    tweet: tweetKeypair.publicKey,
                },
                signers: []
            });

        let tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);

        expect(tweet.likes).to.equal(0);
        expect(tweet.message).to.equal('Hello World!');
        expect(tweet.creator.toString()).to.equal(user.publicKey.toString());
    });


    // it('Re a tweet', async () => {
    //     const tweetKeypair = anchor.web3.Keypair.generate();
    //     const user = program.provider.wallet;
    //     console.log("Account write tweet:", tweetKeypair.publicKey.toBase58());

    //     await program.rpc.setupTweeter({
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //             user: user.publicKey,
    //             systemProgram: anchor.web3.SystemProgram.programId
    //         },
    //         signers: [tweetKeypair]
    //     });

    //     let tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('');

    //     await program.rpc.writeTweet('Hello World!', user.publicKey, {
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //         },
    //         signers: []
    //     });

    //     tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);

    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('Hello World!');
    //     expect(tweet.creator.toString()).to.equal(user.publicKey.toString());


    //     const reTweetKeypair = anchor.web3.Keypair.generate();
    //     await program.rpc.setupTweeter({
    //         accounts: {
    //             tweet: reTweetKeypair.publicKey,
    //             user: user.publicKey,
    //             systemProgram: anchor.web3.SystemProgram.programId
    //         },
    //         signers: [reTweetKeypair]
    //     });


    //     await program.rpc.reTweet(
    //         "Great",
    //         user.publicKey,
    //         tweetKeypair.publicKey,
    //         {
    //             accounts: {
    //                 tweet: reTweetKeypair.publicKey,
    //             },
    //             signers: []
    //         });

    //     let retweet = await program.account.tweet.fetch(reTweetKeypair.publicKey);
    //     expect(retweet.likes).to.equal(0);
    //     // expect(retweet.message).to.equal('Great');
    //     expect(retweet.creator.toString()).to.equal(user.publicKey.toString());
    //     expect(retweet.originTweet.toString()).to.equal(tweetKeypair.publicKey.toString());
    // });


    // it('should like tweet up no more than 5 times', async () => {
    //     const tweetKeypair = anchor.web3.Keypair.generate();
    //     const user = program.provider.wallet;
    //     await program.rpc.setupTweeter({
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //             user: user.publicKey,
    //             systemProgram: anchor.web3.SystemProgram.programId
    //         },
    //         signers: [tweetKeypair]
    //     });

    //     let tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('');

    //     await program.rpc.writeTweet('Hello World!', user.publicKey, {
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //         },
    //         signers: []
    //     });

    //     tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('Hello World!');
    //     expect(tweet.creator.toString()).to.equal(user.publicKey.toString());

    //     await program.rpc.likeTweet(user.publicKey, "Up", {
    //         accounts: {
    //             tweetLike: tweetKeypair.publicKey,
    //         },
    //         signers: []
    //     });

    //     tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     expect(tweet.likes).to.equal(1);
    //     expect(tweet.peopleWhoLiked[0].toString()).to.equal(user.publicKey.toString());

    //     // try {
    //     //     await program.rpc.likeTweet(user.publicKey, {
    //     //         accounts: {
    //     //             tweet_like: tweetKeypair.publicKey,
    //     //         },
    //     //         signers: []
    //     //     });

    //     //     assert.ok(false);
    //     // } catch (error) {
    //     //     const expectedError = 'User has already liked the tweet';
    //     //     assert.equal(error.error.errorMessage, expectedError);
    //     // }


    //     // const secondUser = anchor.web3.Keypair.generate();
    //     // await program.rpc.likeTweet(secondUser.publicKey, {
    //     //     accounts: {
    //     //         tweet_like: tweetKeypair.publicKey,
    //     //     },
    //     //     signers: []
    //     // });

    //     // tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     // expect(tweet.likes).to.equal(2);
    //     // expect(tweet.peopleWhoLiked[1].toString()).to.equal(secondUser.publicKey.toString());



    //     // const thirdUser = anchor.web3.Keypair.generate();
    //     // await program.rpc.likeTweet(thirdUser.publicKey, {
    //     //     accounts: {
    //     //         tweet_like: tweetKeypair.publicKey,
    //     //     },
    //     //     signers: []
    //     // });

    //     // tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     // expect(tweet.likes).to.equal(3);
    //     // expect(tweet.peopleWhoLiked[2].toString()).to.equal(thirdUser.publicKey.toString());



    //     // const fourthUser = anchor.web3.Keypair.generate();
    //     // await program.rpc.likeTweet(fourthUser.publicKey, {
    //     //     accounts: {
    //     //         tweet: tweetKeypair.publicKey,
    //     //     },
    //     //     signers: []
    //     // });

    //     // tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     // expect(tweet.likes).to.equal(4);
    //     // expect(tweet.peopleWhoLiked[3].toString()).to.equal(fourthUser.publicKey.toString());



    //     // const fifthUser = anchor.web3.Keypair.generate();
    //     // await program.rpc.likeTweet(fifthUser.publicKey, {
    //     //     accounts: {
    //     //         tweet: tweetKeypair.publicKey,
    //     //     },
    //     //     signers: []
    //     // });

    //     // tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     // expect(tweet.likes).to.equal(5);
    //     // expect(tweet.peopleWhoLiked[4].toString()).to.equal(fifthUser.publicKey.toString());


    //     // const sixthUser = anchor.web3.Keypair.generate();
    //     // try {


    //     //     await program.rpc.likeTweet(sixthUser.publicKey, {
    //     //         accounts: {
    //     //             tweet: tweetKeypair.publicKey,
    //     //         },
    //     //         signers: []
    //     //     });

    //     //     assert.ok(false);
    //     // } catch (error) {
    //     //     assert.equal(error.error.errorMessage, 'Max like');
    //     // }
    // });

    // it('should not allow writting an empty message', async () => {
    //     const tweetKeypair = anchor.web3.Keypair.generate();
    //     const user = program.provider.wallet;
    //     await program.rpc.setupTweeter({
    //         accounts: {
    //             tweet: tweetKeypair.publicKey,
    //             user: user.publicKey,
    //             systemProgram: anchor.web3.SystemProgram.programId
    //         },
    //         signers: [tweetKeypair]
    //     });

    //     let tweet = await program.account.tweet.fetch(tweetKeypair.publicKey);
    //     expect(tweet.likes).to.equal(0);
    //     expect(tweet.message).to.equal('');


    //     try {
    //         await program.rpc.writeTweet('', user.publicKey, {
    //             accounts: {
    //                 tweet: tweetKeypair.publicKey,
    //             },
    //             signers: []
    //         });
    //         assert.ok(false);
    //     } catch (error) {
    //         assert.equal(error.error.errorMessage, 'Message empty');
    //     }
    // });

});
