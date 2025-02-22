// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts@5.1.0/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts@5.1.0/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Pausable} from "@openzeppelin/contracts@5.1.0/token/ERC20/extensions/ERC20Pausable.sol";
import {ERC20Permit} from "@openzeppelin/contracts@5.1.0/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts@5.1.0/access/Ownable.sol";

contract BlockchainEnergyDrinkToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit {
    bytes32 private keyHash; // Secure hash of the static key
    bool public redeemEnabled = true; // Toggle for redeemTokens
    mapping(string => bool) private redeemedCodes; // Tracks redeemed QR codes

    address public liquidityPool; // Liquidity pool address
    uint256 public collectedFees; // Total collected fees (in native currency)
    uint256 public commissionPercent = 2; // Initial commission percentage (in native currency)

    event TokensRedeemed(address indexed user, uint256 amount, string qrCodeData);
    event KeyUpdated(); // Logs key updates
    event RedeemToggleChanged(bool newStatus); // Logs redeem toggle updates
    event LiquidityPoolSet(address indexed liquidityPool); // Logs LP address updates
    event TokensMinted(address indexed to, uint256 amount); // Logs minting events
    event FeesWithdrawn(address indexed recipient, uint256 amount); // Logs fee withdrawals
    event CommissionUpdated(uint256 newCommission); // Logs commission updates

    constructor(address initialOwner, string memory initialKey)
        ERC20("Blockchain Energy Drink", "BET")
        Ownable(initialOwner)
        ERC20Permit("Blockchain Energy Drink")
    {
        keyHash = keccak256(abi.encodePacked(initialKey)); // Hash initial key off-chain
        _mint(initialOwner, 2000 * 10 ** decimals()); // Initial supply to owner
    }

    /**
     * @dev Mint new tokens.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Update the static key hash.
     */
    function updateKeyHash(bytes32 newKeyHash) external onlyOwner {
        keyHash = newKeyHash;
        emit KeyUpdated();
    }

    /**
     * @dev Set redeem functionality status.
     */
    function setRedeemEnabled(bool enabled) external onlyOwner {
        redeemEnabled = enabled;
        emit RedeemToggleChanged(enabled);
    }

    /**
     * @dev Set liquidity pool address.
     */
    function setLiquidityPool(address lpAddress) external onlyOwner {
        liquidityPool = lpAddress;
        emit LiquidityPoolSet(lpAddress);
    }

    /**
     * @dev Withdraw collected fees in native currency (e.g., BNB, ETH).
     */
    function withdrawFees(address recipient) external onlyOwner {
        require(collectedFees > 0, "No fees to withdraw");
        uint256 amount = collectedFees;
        collectedFees = 0;
        payable(recipient).transfer(amount); // Send collected BNB/ETH to owner
        emit FeesWithdrawn(recipient, amount);
    }

    /**
     * @dev Update the commission percentage.
     */
    function setCommissionPercent(uint256 newPercent) external onlyOwner {
        require(newPercent <= 100, "Commission cannot exceed 100%");
        commissionPercent = newPercent;
        emit CommissionUpdated(newPercent);
    }

    /**
     * @dev Redeem tokens (send from owner to user).
     */
    function redeemTokens(address user, string memory providedKey, string memory qrCodeData) external {
        require(redeemEnabled, "Redeem functionality disabled");
        require(_verifyKey(providedKey), "Invalid key");
        require(!redeemedCodes[qrCodeData], "QR code already redeemed");

        redeemedCodes[qrCodeData] = true;

        uint256 rewardAmount = 10 * 10 ** decimals();
        _transfer(owner(), user, rewardAmount);

        emit TokensRedeemed(user, rewardAmount, qrCodeData);
    }

    /**
     * @dev Overrides the transfer function to include fees.
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        _applyFeeAndTransfer(msg.sender, to, amount);
        return true;
    }

    /**
     * @dev Overrides the transferFrom function to include fees.
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        _spendAllowance(from, msg.sender, amount);
        _applyFeeAndTransfer(from, to, amount);
        return true;
    }

    /**
     * @dev Internal logic for applying fees during transfers 
     */
    function _applyFeeAndTransfer(address from, address to, uint256 amount) internal {
        if (liquidityPool != address(0) && (from == liquidityPool || to == liquidityPool)) {
            uint256 fee = (amount * commissionPercent) / 100;
            uint256 amountAfterFee = amount - fee;

            collectedFees += fee;
            payable(address(this)).transfer(fee); // Collect fee in native currency 
            super._transfer(from, to, amountAfterFee);
        } else {
            super._transfer(from, to, amount);
        }
    }

    /**
     * @dev Verifies the provided key.
     */
    function _verifyKey(string memory providedKey) internal view returns (bool) {
        return keccak256(abi.encodePacked(providedKey)) == keyHash;
    }

    /**
     * @dev Explicitly override `_update` to resolve conflict between `ERC20` and `ERC20Pausable`.
     */
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }

    // Fallback function to accept native currency 
    receive() external payable {}
}
