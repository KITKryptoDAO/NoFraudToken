// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NoFraudToken is OwnableUpgradeable, PausableUpgradeable{
    
    // user => NFT => balance
    mapping(address => mapping(address => uint256)) public nftAmount;
    // user => NFT => tokenId => true
    mapping(address => mapping( address => mapping(uint256 => bool))) public nftGiver;

    event BackEvent(address user, address nft, uint256 tokenId);
    event BurnEvent(address user, address nft, uint256 tokenId);
    
    function initialize() external initializer {
        __Ownable_init(_msgSender());
        __Pausable_init();
    }

    function getBack(address nft, uint256 tokenId) external {
        require(nftGiver[msg.sender][nft][tokenId], "NoFraudToken: not owner");
        IERC721(nft).transferFrom(address(this), msg.sender, tokenId);
        nftAmount[msg.sender][nft] -= 1;
        nftGiver[msg.sender][nft][tokenId] = false;
        emit BackEvent(msg.sender, nft, tokenId);
    }

    function sendToBurn(address nft, uint256 tokenId) external {
        IERC721(nft).transferFrom(msg.sender, address(this), tokenId);
        nftAmount[msg.sender][nft] += 1;
        nftGiver[msg.sender][nft][tokenId] = true;
        emit BurnEvent(msg.sender, nft, tokenId);
    }
    

}