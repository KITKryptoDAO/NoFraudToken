// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract HuoToken is ERC721, Ownable, Pausable {
    

    constructor(address initOwner) ERC721("HuoToken", "HUO") Ownable(initOwner) {
    }



    function mint(address to, uint tokenId) external onlyOwner whenNotPaused {
        _mint(to, tokenId);
    }

    function burn(uint tokenId) external onlyOwner whenPaused {
        _burn(tokenId);
    }

    function _baseURI() internal override pure returns (string memory) {
        return "https://xiaohuo.token/";
    }
    
    function getURI() public pure returns (string memory) {
        string memory baseURI = _baseURI();
        return baseURI;
    }


}