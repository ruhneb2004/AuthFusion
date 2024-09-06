//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {console} from "hardhat/console.sol";

contract GmailAuthTokenGenerator is ERC721, ERC721URIStorage {
    uint256 public _nextTokenId = 1;
    mapping(string => bool) private _uriChecker;
    mapping(address => string) public _addressToUri;

    constructor() ERC721("GmailAuthToken", "GAT") {}

    event GmailTokenGenerated(address, string uri);

    modifier checkIsNotContract() {
        require(msg.sender == tx.origin, "Contracts are not allowed");
        _;
    }

    //Mints the nft if the person is entered through the website. The secret key is used for signing a message in the nextjs and then it is verified here.
    //So anyone who has the comes through the website (i.e, the necessary path) can mint the nft. This makes sure no same person cannot generate the nft without having a gmail or other fraud info!
    function safeMint(string memory uri, bytes memory signature) public checkIsNotContract {
        require(verifySignature(uri, signature), "Invalid signature");
        require(!_uriChecker[uri], "URI already exists");
        _safeMint(msg.sender, _nextTokenId);
        _setTokenURI(_nextTokenId, uri);
        _uriChecker[uri] = true;
        _nextTokenId++;
        emit GmailTokenGenerated(msg.sender, uri);
    }

    function verifySignature(string memory message, bytes memory signature) public pure returns (bool) {
        bytes32 ethSignedMessageHash =
            keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", uintToString(bytes(message).length), message));

        (bytes32 r, bytes32 s, uint8 v) = splitSig(signature);
        address signer = ecrecover(ethSignedMessageHash, v, r, s);
        address expectedSigner = 0x248D89FBA4586BF7FdD8B5a6C2A137E59F203558;

        require(signer == expectedSigner, "Invalid signature");

        return true;
    }

    function uintToString(uint256 v) internal pure returns (string memory) {
        if (v == 0) {
            return "0";
        }
        uint256 j = v;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (v != 0) {
            k--; // Decrement before use
            bstr[k] = bytes1(uint8(48 + v % 10));
            v /= 10;
        }
        return string(bstr);
    }

    function splitSig(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function checkAddressToEmailLinked(address checkerAddress) public view returns (string memory) {
        return _addressToUri[checkerAddress];
    }
}
