// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

contract NoFraudToken is OwnableUpgradeable, PausableUpgradeable{
    

    function initialize() external initializer {
        __Ownable_init(_msgSender());
        __Pausable_init();
    }

    function greeting() public pure returns (string memory) {
        return "hello KKD";
    }



}