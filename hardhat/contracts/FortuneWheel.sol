// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract FortuneWheel is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    IERC20 public magicRewardToken;
    IERC20 public poisonRewardToken;
    IERC20 public voodooToken;

    uint256 constant MAX_SPINS_PER_DAY = 3;
    uint256 constant NUM_OPTIONS = 32;

    mapping(address => uint256) public spinsToday;
    mapping(address => uint256) private lastSpinTimestamp;

    event SpinResult(
        address indexed player,
        uint256 indexed option,
        uint256 tokensWon
    );

    constructor(
        address _magicRewardToken,
        address _poisonRewardToken,
        address _voodooToken
    ) Ownable(msg.sender) {
        magicRewardToken = IERC20(_magicRewardToken);
        poisonRewardToken = IERC20(_poisonRewardToken);
        voodooToken = IERC20(_voodooToken);
    }

    function spinWheel() external {
        _resetSpinsIfNecessary(msg.sender);

        require(
            spinsToday[msg.sender] < MAX_SPINS_PER_DAY,
            "Exceeded daily spin limit"
        );

        uint256 option = _generateRandomOption();
        uint256 tokensWon = _distributeRewards(option);

        spinsToday[msg.sender]++;
        lastSpinTimestamp[msg.sender] = block.timestamp;

        emit SpinResult(msg.sender, option, tokensWon);
    }

    function _resetSpinsIfNecessary(address player) private {
        uint256 lastSpinDay = lastSpinTimestamp[player] / 1 days;
        uint256 currentDay = block.timestamp / 1 days;
        if (lastSpinDay < currentDay) {
            spinsToday[player] = 0;
        }
    }

    function _generateRandomOption() private view returns (uint256) {
        uint256 randomNumber = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
            )
        );
        return (randomNumber % NUM_OPTIONS) + 1;
    }

    function _distributeRewards(uint256 option) private returns (uint256) {
        uint256 tokensWon;

        uint256[32] memory rewards = [
            uint256(10),
            uint256(20),
            uint256(30),
            uint256(40),
            uint256(50),
            uint256(50),
            uint256(40),
            uint256(30),
            uint256(20),
            uint256(10), // MAGIC REWARD TOKEN
            uint256(10),
            uint256(20),
            uint256(30),
            uint256(40),
            uint256(50),
            uint256(50),
            uint256(40),
            uint256(30),
            uint256(20),
            uint256(10), // POISON REWARD TOKEN
            uint256(50),
            uint256(60),
            uint256(70),
            uint256(80),
            uint256(90),
            uint256(100),
            uint256(100),
            uint256(90),
            uint256(80),
            uint256(70),
            uint256(60),
            uint256(50) // VOODOO TOKENS
        ];

        uint256 index = option - 1;

        tokensWon = rewards[index];
        if (index < 10) {
            magicRewardToken.transfer(msg.sender, (uint(tokensWon) * 10**18));
        } else if (index < 20) {
            poisonRewardToken.transfer(msg.sender, (uint(tokensWon) * 10**18));
        } else {
            voodooToken.transfer(msg.sender, (uint(tokensWon) * 10**18));
        }

        return tokensWon;
    }

    function getUserSpinInfo(
        address user
    ) external view returns (uint256 spinsLeft, uint256 timeUntilReset) {
        uint256 currentDay = block.timestamp / 1 days;
        uint256 lastSpinDay = lastSpinTimestamp[user] / 1 days;

        // If the user has spun today, calculate spins left and time until reset.
        // Otherwise, consider the full spin limit available and calculate time until next reset from now.
        if (lastSpinDay == currentDay) {
            spinsLeft = MAX_SPINS_PER_DAY - spinsToday[user];
            // Time until reset is calculated as the difference between the end of the current day and the current timestamp.
            timeUntilReset = ((currentDay + 1) * 1 days) - block.timestamp;
        } else {
            spinsLeft = MAX_SPINS_PER_DAY;
            timeUntilReset = (currentDay * 1 days) + 1 days - block.timestamp;
        }

        return (spinsLeft, timeUntilReset);
    }

    function withdrawTokens(address _token, uint _amount) external onlyOwner {
        IERC20(_token).transfer(msg.sender, _amount);
    }
}
