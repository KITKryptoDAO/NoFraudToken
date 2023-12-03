// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract HuoToken is OwnableUpgradeable, PausableUpgradeable, ERC721EnumerableUpgradeable{
    

    function initialize() initializer public {
        __ERC721_init("Huo Token", "HUO");
        __Ownable_init(_msgSender());
        __Pausable_init();
     }

    function mint(address to, uint tokenId) external {
        _mint(to, tokenId);
    }

    function burn(uint tokenId) external {
        _burn(tokenId);
    }

    function _baseURI() internal override pure returns (string memory) {
        return "https://xiaohuo.token/id/";
    }
    
    function getURI() public pure returns (string memory) {
        string memory baseURI = _baseURI();
        return baseURI;
    }


}