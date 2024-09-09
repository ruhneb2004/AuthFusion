# AuthFusion

<img width="1680" alt="Screenshot 2024-09-09 at 7 52 45 PM" src="https://github.com/user-attachments/assets/0d8f1719-009b-435e-a1ac-61df553ebe29">

## Project Description
This project is aimed to bridge the auth process between web 2 and 3. This is a project in which the users can generate an NFT for their gmail, here only one NFT can be minted per gmail account. The users can only generate their NFT if they have connected their wallet and have also done their auth process for the selected gmail. After successful auth process the user can then use that NFT for verification in the web2 just using the existing wallet address. This binding of gmail could give the wallet address an additional layer of authenticity. This approach can unite the web2 and web3 identity of an individual in an easier manner. This could be extended for other socials as well.

## How it works 🤔

As a whole the user can simply login to the website using their gmail after completing the google auth process. The authenticated user can then mint an NFT for their respective gmail. We can verify the user for their gmail based on whether they have their Gmail NFT from this specific smart contract.

## But can't anyone just mint NFT for any gmail account by directly interacting with the smart contract?

Well... actually no! Because people can only mint an NFT after going the google auth process from our frontend. How this works is explained in detail below. But is this good approach for accessability? Well I for someone to actually mint an NFT they have to prove their claim to their respective gmail and this could be a little difficult to solve otherwise, so by simply restricting the access and making the entry through only the frontend makes it easy for assuring that they are indeed the owner of the gmail.

## How it works?

The idea is we "SIGN EVERY TRANSACTION USING A RANDOMLY GENERATED PRIVATE KEY!", for a user to mint an NFT they have to first get the signature. To get a signature you have to click the  ***proceed to Mint NFT***.
This will generate a signature using a private key stored in the env and the gmail address(This is a randomly generated private key, so no treasure is awaiting you, huahaha!🏴‍☠️).
<img width="753" alt="Screenshot 2024-09-09 at 8 11 52 PM" src="https://github.com/user-attachments/assets/c32a9ce6-af89-4dde-9e81-6f2889ca5cd4">

The signature can then be passed down to the safeMint method and after verifying the signature in the chain, then the user can generate their NFT!


<img width="629" alt="Screenshot 2024-09-09 at 8 09 19 PM" src="https://github.com/user-attachments/assets/bcc13a21-f7b4-4792-981b-39f8736716be"> 

## Potential Issues

The private key stored in the env file is a major security issue. Other than that there are no massive issues.
In case of losing the address holding the NFT the user will lose their respected gmail identity. This can be prevented by some little tweeks in the smart contract which I am leaving as challenge for someone who wants to try it out.

## Conclusion

As a whole this is project showing the concept of using a NFT for verification. This is by no means actually useful as it is for production. But it would be cool if someone could actually pull this it would be super cool!
