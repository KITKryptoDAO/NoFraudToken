// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NoFraudToken is OwnableUpgradeable, PausableUpgradeable{
    
    // user => NFT => balance
    mapping(address => mapping(address => uint256)) public nftAmount;
    // user => NFT => tokenId => bool
    mapping(address => mapping( address => mapping(uint256 => bool))) public nftGiver;
    // NFT => tokenId => bool
    mapping(address => mapping(uint256 => bool)) public nftOwned;
    // NFT => balance
    mapping(address => uint256) public nftBalance;


    event BackEvent(address user, address nft, uint256 tokenId);
    event BurnEvent(address user, address nft, uint256 tokenId);
    
    function initialize() external initializer {
        __Ownable_init(_msgSender());
        __Pausable_init();
    }

    function getBack(address nft, uint256 tokenId) public whenNotPaused {
        require(nftOwned[nft][tokenId], "NoFraudToken: token not owned");
        require(nftGiver[msg.sender][nft][tokenId], "NoFraudToken: only giver can ask back");
        IERC721(nft).transferFrom(address(this), msg.sender, tokenId);
        nftAmount[msg.sender][nft] -= 1;
        nftBalance[nft] -= 1;
        nftGiver[msg.sender][nft][tokenId] = false;
        nftOwned[nft][tokenId] = false;
        emit BackEvent(msg.sender, nft, tokenId);
    }

    function bulkBack(address nft, uint256[] calldata tokenIds) external {
        uint256 length = tokenIds.length;
        for (uint256 i; i < length; i++) {
            uint256 tokenId = tokenIds[i];
            getBack(nft, tokenId);
        }
    }

    function sendToBurn(address nft, uint256 tokenId) public whenNotPaused {
        IERC721(nft).transferFrom(msg.sender, address(this), tokenId);
        nftAmount[msg.sender][nft] += 1;
        nftBalance[nft] += 1;
        nftGiver[msg.sender][nft][tokenId] = true;
        nftOwned[nft][tokenId] = true;
        emit BurnEvent(msg.sender, nft, tokenId);
    }

    function bulkBurn(address nft, uint256[] calldata tokenIds) external {
        uint256 length = tokenIds.length;
        for (uint256 i; i < length; i++) {
            uint256 tokenId = tokenIds[i];
            sendToBurn(nft, tokenId);
        }
    }
}