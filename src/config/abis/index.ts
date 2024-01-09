const IAaveV2LendingPoolLike = [
  'function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)',
  'function withdraw(address asset, uint256 amount, address to) returns (uint256)'
]

const IBondPool = [
  'event BondClaimed(address indexed account, uint256 amount)',
  'event BondCreated(address indexed account, uint256 lpTokens, uint256 npmToVest, uint256 unlockDate)',
  'event BondPoolSetup(tuple(address lpToken, address treasury, uint256 bondDiscountRate, uint256 maxBondAmount, uint256 vestingTerm, uint256 npmToTopUpNow) args)',
  'function calculateTokensForLp(uint256 lpTokens) view returns (uint256)',
  'function claimBond()',
  'function createBond(uint256 lpTokens, uint256 minNpmDesired)',
  'function getInfo(address forAccount) view returns (tuple(address lpToken, uint256 marketPrice, uint256 discountRate, uint256 vestingTerm, uint256 maxBond, uint256 totalNpmAllocated, uint256 totalNpmDistributed, uint256 npmAvailable, uint256 bondContribution, uint256 claimable, uint256 unlockDate) info)',
  'function getName() pure returns (bytes32)',
  'function getNpmMarketPrice() view returns (uint256)',
  'function setup(tuple(address lpToken, address treasury, uint256 bondDiscountRate, uint256 maxBondAmount, uint256 vestingTerm, uint256 npmToTopUpNow) args)',
  'function version() pure returns (bytes32)'
]

const IClaimsProcessor = [
  'event BlacklistSet(bytes32 indexed coverKey, bytes32 indexed productKey, uint256 indexed incidentDate, address account, bool status)',
  'event ClaimPeriodSet(bytes32 indexed coverKey, uint256 previous, uint256 current)',
  'event Claimed(address cxToken, bytes32 indexed coverKey, bytes32 indexed productKey, uint256 incidentDate, address indexed account, address reporter, uint256 amount, uint256 reporterFee, uint256 platformFee, uint256 claimed)',
  'function claim(address cxToken, bytes32 coverKey, bytes32 productKey, uint256 incidentDate, uint256 amount)',
  'function getClaimExpiryDate(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function getName() pure returns (bytes32)',
  'function isBlacklisted(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, address account) view returns (bool)',
  'function setBlacklist(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, address[] accounts, bool[] statuses)',
  'function setClaimPeriod(bytes32 coverKey, uint256 value)',
  'function validate(address cxToken, bytes32 coverKey, bytes32 productKey, uint256 incidentDate, uint256 amount) view returns (bool)',
  'function version() pure returns (bytes32)'
]

const ICompoundERC20DelegatorLike = [
  'function mint(uint256 mintAmount) returns (uint256)',
  'function redeem(uint256 redeemTokens) returns (uint256)'
]

const ICover = [
  'event CoverCreated(bytes32 indexed coverKey, string info, string tokenName, string tokenSymbol, bool indexed supportsProducts, bool indexed requiresWhitelist)',
  'event CoverCreationFeeSet(uint256 previous, uint256 current)',
  'event CoverCreatorWhitelistUpdated(address account, bool status)',
  'event CoverInitialized(address indexed stablecoin, bytes32 withName)',
  'event CoverUpdated(bytes32 indexed coverKey, string info)',
  'event CoverUserWhitelistUpdated(bytes32 indexed coverKey, bytes32 indexed productKey, address indexed account, bool status)',
  'event MinCoverCreationStakeSet(uint256 previous, uint256 current)',
  'event MinStakeToAddLiquiditySet(uint256 previous, uint256 current)',
  'event ProductCreated(bytes32 indexed coverKey, bytes32 productKey, string info)',
  'event ProductStateUpdated(bytes32 indexed coverKey, bytes32 indexed productKey, address indexed updatedBy, bool status, string reason)',
  'event ProductUpdated(bytes32 indexed coverKey, bytes32 productKey, string info)',
  'function addCover(tuple(bytes32 coverKey, string info, string tokenName, string tokenSymbol, bool supportsProducts, bool requiresWhitelist, uint256 stakeWithFee, uint256 initialReassuranceAmount, uint256 minStakeToReport, uint256 reportingPeriod, uint256 cooldownPeriod, uint256 claimPeriod, uint256 floor, uint256 ceiling, uint256 reassuranceRate, uint256 leverageFactor) args) returns (address)',
  'function addCovers(tuple(bytes32 coverKey, string info, string tokenName, string tokenSymbol, bool supportsProducts, bool requiresWhitelist, uint256 stakeWithFee, uint256 initialReassuranceAmount, uint256 minStakeToReport, uint256 reportingPeriod, uint256 cooldownPeriod, uint256 claimPeriod, uint256 floor, uint256 ceiling, uint256 reassuranceRate, uint256 leverageFactor)[] args) returns (address[] vaults)',
  'function addProduct(tuple(bytes32 coverKey, bytes32 productKey, string info, bool requiresWhitelist, uint256 productStatus, uint256 efficiency) args)',
  'function addProducts(tuple(bytes32 coverKey, bytes32 productKey, string info, bool requiresWhitelist, uint256 productStatus, uint256 efficiency)[] args)',
  'function checkIfWhitelistedCoverCreator(address account) view returns (bool)',
  'function checkIfWhitelistedUser(bytes32 coverKey, bytes32 productKey, address account) view returns (bool)',
  'function disablePolicy(bytes32 coverKey, bytes32 productKey, bool status, string reason)',
  'function getName() pure returns (bytes32)',
  'function initialize(address stablecoin, bytes32 friendlyName)',
  'function setCoverCreationFee(uint256 value)',
  'function setMinCoverCreationStake(uint256 value)',
  'function setMinStakeToAddLiquidity(uint256 value)',
  'function updateCover(bytes32 coverKey, string info)',
  'function updateCoverCreatorWhitelist(address[] account, bool[] whitelisted)',
  'function updateCoverUsersWhitelist(bytes32 coverKey, bytes32 productKey, address[] accounts, bool[] statuses)',
  'function updateProduct(tuple(bytes32 coverKey, bytes32 productKey, string info, uint256 productStatus, uint256 efficiency) args)',
  'function version() pure returns (bytes32)'
]

const ICoverReassurance = [
  'event PoolCapitalized(bytes32 indexed coverKey, bytes32 indexed productKey, uint256 indexed incidentDate, uint256 amount)',
  'event ReassuranceAdded(bytes32 indexed coverKey, address indexed onBehalfOf, uint256 amount)',
  'event WeightSet(bytes32 indexed coverKey, uint256 weight)',
  'function addReassurance(bytes32 coverKey, address onBehalfOf, uint256 amount)',
  'function capitalizePool(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function getName() pure returns (bytes32)',
  'function getReassurance(bytes32 coverKey) view returns (uint256)',
  'function setWeight(bytes32 coverKey, uint256 weight)',
  'function version() pure returns (bytes32)'
]

const ICoverStake = [
  'event FeeBurned(bytes32 indexed coverKey, uint256 amount)',
  'event StakeAdded(bytes32 indexed coverKey, address indexed account, uint256 amount)',
  'event StakeRemoved(bytes32 indexed coverKey, address indexed account, uint256 amount)',
  'function decreaseStake(bytes32 coverKey, uint256 amount)',
  'function getName() pure returns (bytes32)',
  'function increaseStake(bytes32 coverKey, address account, uint256 amount, uint256 fee)',
  'function stakeOf(bytes32 coverKey, address account) view returns (uint256)',
  'function version() pure returns (bytes32)'
]

const ICoverUpdate = [
  'event CoverDeleted(bytes32 indexed coverKey)',
  'event ProductDeleted(bytes32 indexed coverKey, bytes32 indexed productKey)',
  'function deleteCover(bytes32 coverKey)',
  'function deleteProduct(bytes32 coverKey, bytes32 productKey)',
  'function getName() pure returns (bytes32)',
  'function version() pure returns (bytes32)'
]

const ICxToken = [
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event CoverageStartSet(uint256 policyId, bytes32 coverKey, bytes32 productKey, address account, uint256 effectiveFrom, uint256 amount)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function COVER_KEY() view returns (bytes32)',
  'function PRODUCT_KEY() view returns (bytes32)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function burn(uint256 amount)',
  'function createdOn() view returns (uint256)',
  'function expiresOn() view returns (uint256)',
  'function getClaimablePolicyOf(address account) view returns (uint256)',
  'function getCoverageStartsFrom(address account, uint256 date) view returns (uint256)',
  'function mint(uint256 policyId, bytes32 coverKey, bytes32 productKey, address to, uint256 amount)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)'
]

const ICxTokenFactory = [
  'event CxTokenDeployed(address cxToken, address store, bytes32 indexed coverKey, bytes32 indexed productKey, string tokenName, uint256 indexed expiryDate)',
  'function deploy(bytes32 coverKey, bytes32 productKey, string tokenName, uint256 expiryDate) returns (address)',
  'function getName() pure returns (bytes32)',
  'function version() pure returns (bytes32)'
]

const IERC20 = [
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)'
]

const IERC20Detailed = [
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function mint(uint256 amount)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)'
]

const IFinalization = [
  'event Finalized(bytes32 indexed coverKey, bytes32 indexed productKey, address finalizer, uint256 indexed incidentDate)',
  'function finalize(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)'
]

const IGovernance = [
  'event Attested(bytes32 indexed coverKey, bytes32 indexed productKey, address witness, uint256 indexed incidentDate, uint256 stake)',
  'event Disputed(bytes32 indexed coverKey, bytes32 indexed productKey, address reporter, uint256 indexed incidentDate, string info, uint256 initialStake)',
  'event FirstReportingStakeSet(bytes32 coverKey, uint256 previous, uint256 current)',
  'event Refuted(bytes32 indexed coverKey, bytes32 indexed productKey, address witness, uint256 indexed incidentDate, uint256 stake)',
  'event Reported(bytes32 indexed coverKey, bytes32 indexed productKey, address reporter, uint256 indexed incidentDate, string info, uint256 initialStake, uint256 resolutionTimestamp)',
  'event ReporterCommissionSet(uint256 previous, uint256 current)',
  'event ReportingBurnRateSet(uint256 previous, uint256 current)',
  'function attest(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, uint256 stake)',
  'function dispute(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, string info, uint256 stake)',
  'function getActiveIncidentDate(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function getAttestation(bytes32 coverKey, bytes32 productKey, address who, uint256 incidentDate) view returns (uint256 myStake, uint256 totalStake)',
  'function getFirstReportingStake(bytes32 coverKey) view returns (uint256)',
  'function getName() pure returns (bytes32)',
  'function getRefutation(bytes32 coverKey, bytes32 productKey, address who, uint256 incidentDate) view returns (uint256 myStake, uint256 totalStake)',
  'function getReporter(bytes32 coverKey, bytes32 productKey, uint256 incidentDate) view returns (address)',
  'function getResolutionTimestamp(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function getStakes(bytes32 coverKey, bytes32 productKey, uint256 incidentDate) view returns (uint256, uint256)',
  'function getStakesOf(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, address account) view returns (uint256, uint256)',
  'function getStatus(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function isCoverNormal(bytes32 coverKey) view returns (bool)',
  'function refute(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, uint256 stake)',
  'function report(bytes32 coverKey, bytes32 productKey, string info, uint256 stake)',
  'function setFirstReportingStake(bytes32 coverKey, uint256 value)',
  'function setReporterCommission(uint256 value)',
  'function setReportingBurnRate(uint256 value)',
  'function version() pure returns (bytes32)'
]

const ILendingStrategy = [
  'event Deposited(bytes32 indexed key, address indexed onBehalfOf, uint256 stablecoinDeposited, uint256 certificateTokenIssued)',
  'event Drained(address indexed asset, uint256 amount)',
  'event LogDeposit(bytes32 indexed name, uint256 counter, uint256 amount, uint256 certificateReceived, uint256 depositTotal, uint256 withdrawalTotal)',
  'event LogWithdrawal(bytes32 indexed name, uint256 counter, uint256 stablecoinWithdrawn, uint256 certificateRedeemed, uint256 depositTotal, uint256 withdrawalTotal)',
  'event Withdrawn(bytes32 indexed key, address indexed sendTo, uint256 stablecoinWithdrawn, uint256 certificateTokenRedeemed)',
  'function deposit(bytes32 coverKey, uint256 amount) returns (uint256 certificateReceived)',
  'function getDepositAsset() view returns (address)',
  'function getDepositCertificate() view returns (address)',
  'function getInfo(bytes32 coverKey) view returns (tuple(uint256 deposits, uint256 withdrawals) info)',
  'function getKey() pure returns (bytes32)',
  'function getName() pure returns (bytes32)',
  'function getWeight() pure returns (uint256)',
  'function version() pure returns (bytes32)',
  'function withdraw(bytes32 coverKey) returns (uint256 stablecoinWithdrawn)'
]

const ILiquidityEngine = [
  'event LiquidityStateUpdateIntervalSet(uint256 duration)',
  'event MaxLendingRatioSet(uint256 ratio)',
  'event RiskPoolingPeriodSet(bytes32 indexed coverKey, uint256 lendingPeriod, uint256 withdrawalWindow)',
  'event StrategyAdded(address indexed strategy)',
  'event StrategyDeleted(address indexed strategy)',
  'event StrategyDisabled(address indexed strategy)',
  'function addBulkLiquidity(tuple(bytes32 coverKey, uint256 amount, uint256 npmStakeToAdd, bytes32 referralCode)[] args)',
  'function addStrategies(address[] strategies)',
  'function deleteStrategy(address strategy)',
  'function disableStrategy(address strategy)',
  'function getActiveStrategies() view returns (address[] strategies)',
  'function getDisabledStrategies() view returns (address[] strategies)',
  'function getMaxLendingRatio() view returns (uint256 ratio)',
  'function getName() pure returns (bytes32)',
  'function getRiskPoolingPeriods(bytes32 coverKey) view returns (uint256 lendingPeriod, uint256 withdrawalWindow)',
  'function setLiquidityStateUpdateInterval(uint256 value)',
  'function setMaxLendingRatio(uint256 ratio)',
  'function setRiskPoolingPeriods(bytes32 coverKey, uint256 lendingPeriod, uint256 withdrawalWindow)',
  'function version() pure returns (bytes32)'
]

const IMember = [
  'function getName() pure returns (bytes32)',
  'function version() pure returns (bytes32)'
]

const IPausable = [
  'function paused() view returns (bool)'
]

const IPolicy = [
  'event CoverPurchased(tuple(address onBehalfOf, bytes32 coverKey, bytes32 productKey, uint256 coverDuration, uint256 amountToCover, bytes32 referralCode) args, address indexed cxToken, uint256 fee, uint256 platformFee, uint256 expiresOn, uint256 policyId)',
  'function getAvailableLiquidity(bytes32 coverKey) view returns (uint256)',
  'function getCommitment(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function getCoverFeeInfo(bytes32 coverKey, bytes32 productKey, uint256 coverDuration, uint256 amountToCover) view returns (tuple(uint256 fee, uint256 utilizationRatio, uint256 totalAvailableLiquidity, uint256 floor, uint256 ceiling, uint256 rate))',
  'function getCoverPoolSummary(bytes32 coverKey, bytes32 productKey) view returns (tuple(uint256 totalAmountInPool, uint256 totalCommitment, uint256 reassuranceAmount, uint256 reassurancePoolWeight, uint256 productCount, uint256 leverage, uint256 productCapitalEfficiency) summary)',
  'function getCxToken(bytes32 coverKey, bytes32 productKey, uint256 coverDuration) view returns (address cxToken, uint256 expiryDate)',
  'function getCxTokenByExpiryDate(bytes32 coverKey, bytes32 productKey, uint256 expiryDate) view returns (address cxToken)',
  'function getExpiryDate(uint256 today, uint256 coverDuration) pure returns (uint256)',
  'function getName() pure returns (bytes32)',
  'function purchaseCover(tuple(address onBehalfOf, bytes32 coverKey, bytes32 productKey, uint256 coverDuration, uint256 amountToCover, bytes32 referralCode) args) returns (address, uint256)',
  'function version() pure returns (bytes32)'
]

const IPolicyAdmin = [
  'event CoverPolicyRateSet(bytes32 indexed coverKey, uint256 floor, uint256 ceiling)',
  'event CoverageLagSet(bytes32 indexed coverKey, uint256 window)',
  'function getCoverageLag(bytes32 coverKey) view returns (uint256)',
  'function getName() pure returns (bytes32)',
  'function getPolicyRates(bytes32 coverKey) view returns (uint256 floor, uint256 ceiling)',
  'function setCoverageLag(bytes32 coverKey, uint256 window)',
  'function setPolicyRatesByKey(bytes32 coverKey, uint256 floor, uint256 ceiling)',
  'function version() pure returns (bytes32)'
]

const IPriceOracle = [
  'function consult(address token, uint256 amountIn) view returns (uint256 amountOut)',
  'function consultPair(uint256 amountIn) view returns (uint256)',
  'function update()'
]

const IProtocol = [
  'event ContractAdded(bytes32 indexed namespace, bytes32 indexed key, address indexed contractAddress)',
  'event ContractUpgraded(bytes32 indexed namespace, bytes32 indexed key, address previous, address indexed current)',
  'event Initialized(tuple(address burner, address uniswapV2RouterLike, address uniswapV2FactoryLike, address npm, address treasury, address priceOracle, uint256 coverCreationFee, uint256 minCoverCreationStake, uint256 minStakeToAddLiquidity, uint256 firstReportingStake, uint256 claimPeriod, uint256 reportingBurnRate, uint256 governanceReporterCommission, uint256 claimPlatformFee, uint256 claimReporterCommission, uint256 flashLoanFee, uint256 flashLoanFeeProtocol, uint256 resolutionCoolDownPeriod, uint256 stateUpdateInterval, uint256 maxLendingRatio, uint256 lendingPeriod, uint256 withdrawalWindow, uint256 policyFloor, uint256 policyCeiling) args)',
  'event MemberAdded(address member)',
  'event MemberRemoved(address member)',
  'event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)',
  'event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)',
  'event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)',
  'function addContract(bytes32 namespace, address contractAddress)',
  'function addContractWithKey(bytes32 namespace, bytes32 coverKey, address contractAddress)',
  'function addContracts(bytes32[] namespaces, bytes32[] keys, address[] contractAddresses)',
  'function addMember(address member)',
  'function getName() pure returns (bytes32)',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function grantRole(bytes32 role, address account)',
  'function grantRoles(tuple(address account, bytes32[] roles)[] detail)',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function initialize(tuple(address burner, address uniswapV2RouterLike, address uniswapV2FactoryLike, address npm, address treasury, address priceOracle, uint256 coverCreationFee, uint256 minCoverCreationStake, uint256 minStakeToAddLiquidity, uint256 firstReportingStake, uint256 claimPeriod, uint256 reportingBurnRate, uint256 governanceReporterCommission, uint256 claimPlatformFee, uint256 claimReporterCommission, uint256 flashLoanFee, uint256 flashLoanFeeProtocol, uint256 resolutionCoolDownPeriod, uint256 stateUpdateInterval, uint256 maxLendingRatio, uint256 lendingPeriod, uint256 withdrawalWindow, uint256 policyFloor, uint256 policyCeiling) args)',
  'function removeMember(address member)',
  'function renounceRole(bytes32 role, address account)',
  'function revokeRole(bytes32 role, address account)',
  'function upgradeContract(bytes32 namespace, address previous, address current)',
  'function upgradeContractWithKey(bytes32 namespace, bytes32 coverKey, address previous, address current)',
  'function version() pure returns (bytes32)'
]

const IRecoverable = [
  'function recoverEther(address sendTo)',
  'function recoverToken(address token, address sendTo)',
  'function s() view returns (address)'
]

const IReporter = [
  'event Disputed(bytes32 indexed coverKey, bytes32 indexed productKey, address reporter, uint256 indexed incidentDate, string info, uint256 initialStake)',
  'event FirstReportingStakeSet(bytes32 coverKey, uint256 previous, uint256 current)',
  'event Reported(bytes32 indexed coverKey, bytes32 indexed productKey, address reporter, uint256 indexed incidentDate, string info, uint256 initialStake, uint256 resolutionTimestamp)',
  'event ReporterCommissionSet(uint256 previous, uint256 current)',
  'event ReportingBurnRateSet(uint256 previous, uint256 current)',
  'function dispute(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, string info, uint256 stake)',
  'function getActiveIncidentDate(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function getAttestation(bytes32 coverKey, bytes32 productKey, address who, uint256 incidentDate) view returns (uint256 myStake, uint256 totalStake)',
  'function getFirstReportingStake(bytes32 coverKey) view returns (uint256)',
  'function getRefutation(bytes32 coverKey, bytes32 productKey, address who, uint256 incidentDate) view returns (uint256 myStake, uint256 totalStake)',
  'function getReporter(bytes32 coverKey, bytes32 productKey, uint256 incidentDate) view returns (address)',
  'function getResolutionTimestamp(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function report(bytes32 coverKey, bytes32 productKey, string info, uint256 stake)',
  'function setFirstReportingStake(bytes32 coverKey, uint256 value)',
  'function setReporterCommission(uint256 value)',
  'function setReportingBurnRate(uint256 value)'
]

const IResolution = [
  'event CooldownPeriodConfigured(bytes32 indexed coverKey, uint256 period)',
  'event Finalized(bytes32 indexed coverKey, bytes32 indexed productKey, address finalizer, uint256 indexed incidentDate)',
  'event GovernanceBurned(bytes32 indexed coverKey, bytes32 indexed productKey, address caller, address indexed burner, uint256 originalReward, uint256 burnedAmount)',
  'event ReportClosed(bytes32 indexed coverKey, bytes32 indexed productKey, address indexed closedBy, uint256 incidentDate)',
  'event ReporterRewardDistributed(bytes32 indexed coverKey, bytes32 indexed productKey, address caller, address indexed reporter, uint256 originalReward, uint256 reporterReward)',
  'event Resolved(bytes32 indexed coverKey, bytes32 indexed productKey, uint256 incidentDate, uint256 resolutionDeadline, bool decision, bool emergency, uint256 claimBeginsFrom, uint256 claimExpiresAt)',
  'event Unstaken(bytes32 indexed coverKey, bytes32 indexed productKey, address indexed caller, uint256 originalStake, uint256 reward)',
  'function closeReport(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function configureCoolDownPeriod(bytes32 coverKey, uint256 period)',
  'function emergencyResolve(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, bool decision)',
  'function finalize(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function getCoolDownPeriod(bytes32 coverKey) view returns (uint256)',
  'function getName() pure returns (bytes32)',
  'function getResolutionDeadline(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function getUnstakeInfoFor(address account, bytes32 coverKey, bytes32 productKey, uint256 incidentDate) view returns (tuple(uint256 totalStakeInWinningCamp, uint256 totalStakeInLosingCamp, uint256 myStakeInWinningCamp, uint256 toBurn, uint256 toReporter, uint256 myReward, uint256 unstaken))',
  'function resolve(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function unstake(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function unstakeWithClaim(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function version() pure returns (bytes32)'
]

const IResolvable = [
  'event CooldownPeriodConfigured(bytes32 indexed coverKey, uint256 period)',
  'event ReportClosed(bytes32 indexed coverKey, bytes32 indexed productKey, address indexed closedBy, uint256 incidentDate)',
  'event Resolved(bytes32 indexed coverKey, bytes32 indexed productKey, uint256 incidentDate, uint256 resolutionDeadline, bool decision, bool emergency, uint256 claimBeginsFrom, uint256 claimExpiresAt)',
  'function closeReport(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function configureCoolDownPeriod(bytes32 coverKey, uint256 period)',
  'function emergencyResolve(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, bool decision)',
  'function getCoolDownPeriod(bytes32 coverKey) view returns (uint256)',
  'function getResolutionDeadline(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function resolve(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)'
]

const IStakingPools = [
  'event Deposited(bytes32 indexed key, address indexed account, address indexed token, uint256 amount)',
  'event PoolClosed(bytes32 indexed key, string name)',
  'event PoolUpdated(bytes32 indexed key, tuple(bytes32 key, string name, uint8 poolType, address stakingToken, address uniStakingTokenDollarPair, address rewardToken, address uniRewardTokenDollarPair, uint256 stakingTarget, uint256 maxStake, uint256 platformFee, uint256 rewardPerBlock, uint256 lockupPeriod, uint256 rewardTokenToDeposit) args)',
  'event RewardsWithdrawn(bytes32 indexed key, address indexed account, address indexed token, uint256 rewards, uint256 platformFee)',
  'event Withdrawn(bytes32 indexed key, address indexed account, address indexed token, uint256 amount)',
  'function addOrEditPool(tuple(bytes32 key, string name, uint8 poolType, address stakingToken, address uniStakingTokenDollarPair, address rewardToken, address uniRewardTokenDollarPair, uint256 stakingTarget, uint256 maxStake, uint256 platformFee, uint256 rewardPerBlock, uint256 lockupPeriod, uint256 rewardTokenToDeposit) args)',
  'function calculateRewards(bytes32 key, address account) view returns (uint256)',
  'function closePool(bytes32 key)',
  'function deposit(bytes32 key, uint256 amount)',
  'function getInfo(bytes32 key, address you) view returns (tuple(string name, address stakingToken, address stakingTokenStablecoinPair, address rewardToken, address rewardTokenStablecoinPair, uint256 totalStaked, uint256 target, uint256 maximumStake, uint256 stakeBalance, uint256 cumulativeDeposits, uint256 rewardPerBlock, uint256 platformFee, uint256 lockupPeriod, uint256 rewardTokenBalance, uint256 accountStakeBalance, uint256 totalBlockSinceLastReward, uint256 rewards, uint256 canWithdrawFromBlockHeight, uint256 lastDepositHeight, uint256 lastRewardHeight) info)',
  'function getName() pure returns (bytes32)',
  'function version() pure returns (bytes32)',
  'function withdraw(bytes32 key, uint256 amount)',
  'function withdrawRewards(bytes32 key)'
]

const IStore = [
  'event PausersSet(address indexed addedBy, address[] accounts, bool[] statuses)',
  'function addUint(bytes32 k, uint256 v)',
  'function countAddressArrayItems(bytes32 k) view returns (uint256)',
  'function countBytes32ArrayItems(bytes32 k) view returns (uint256)',
  'function deleteAddress(bytes32 k)',
  'function deleteAddressArrayItem(bytes32 k, address v)',
  'function deleteAddressArrayItemByIndex(bytes32 k, uint256 i)',
  'function deleteBool(bytes32 k)',
  'function deleteBytes(bytes32 k)',
  'function deleteBytes32(bytes32 k)',
  'function deleteBytes32ArrayItem(bytes32 k, bytes32 v)',
  'function deleteBytes32ArrayItemByIndex(bytes32 k, uint256 i)',
  'function deleteInt(bytes32 k)',
  'function deleteString(bytes32 k)',
  'function deleteUint(bytes32 k)',
  'function deleteUints(bytes32 k)',
  'function getAddress(bytes32 k) view returns (address)',
  'function getAddressArray(bytes32 k) view returns (address[])',
  'function getAddressArrayItemByIndex(bytes32 k, uint256 i) view returns (address)',
  'function getAddressArrayItemPosition(bytes32 k, address toFind) view returns (uint256)',
  'function getAddressBoolean(bytes32 k, address a) view returns (bool)',
  'function getAddressValues(bytes32[] keys) view returns (address[] values)',
  'function getBool(bytes32 k) view returns (bool)',
  'function getBytes(bytes32 k) view returns (bytes)',
  'function getBytes32(bytes32 k) view returns (bytes32)',
  'function getBytes32Array(bytes32 k) view returns (bytes32[])',
  'function getBytes32ArrayItemByIndex(bytes32 k, uint256 i) view returns (bytes32)',
  'function getBytes32ArrayItemPosition(bytes32 k, bytes32 toFind) view returns (uint256)',
  'function getInt(bytes32 k) view returns (int256)',
  'function getString(bytes32 k) view returns (string)',
  'function getUint(bytes32 k) view returns (uint256)',
  'function getUintValues(bytes32[] keys) view returns (uint256[] values)',
  'function getUints(bytes32 k) view returns (uint256[])',
  'function setAddress(bytes32 k, address v)',
  'function setAddressArrayItem(bytes32 k, address v)',
  'function setAddressBoolean(bytes32 k, address a, bool v)',
  'function setBool(bytes32 k, bool v)',
  'function setBytes(bytes32 k, bytes v)',
  'function setBytes32(bytes32 k, bytes32 v)',
  'function setBytes32ArrayItem(bytes32 k, bytes32 v)',
  'function setInt(bytes32 k, int256 v)',
  'function setPausers(address[] accounts, bool[] statuses)',
  'function setString(bytes32 k, string v)',
  'function setUint(bytes32 k, uint256 v)',
  'function setUints(bytes32 k, uint256[] v)',
  'function subtractUint(bytes32 k, uint256 v)'
]

const IUniswapV2FactoryLike = [
  'event PairCreated(address indexed token0, address indexed token1, address pair, uint256)',
  'function getPair(address tokenA, address tokenB) view returns (address pair)'
]

const IUniswapV2PairLike = [
  'function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  'function token0() view returns (address)',
  'function token1() view returns (address)',
  'function totalSupply() view returns (uint256)'
]

const IUniswapV2RouterLike = [
  'function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) returns (uint256 amountA, uint256 amountB, uint256 liquidity)',
  'function factory() view returns (address)',
  'function getAmountIn(uint256 amountOut, uint256 reserveIn, uint256 reserveOut) pure returns (uint256 amountIn)',
  'function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) pure returns (uint256 amountOut)',
  'function getAmountsIn(uint256 amountOut, address[] path) view returns (uint256[] amounts)',
  'function getAmountsOut(uint256 amountIn, address[] path) view returns (uint256[] amounts)',
  'function quote(uint256 amountA, uint256 reserveA, uint256 reserveB) pure returns (uint256 amountB)'
]

const IUnstakable = [
  'event GovernanceBurned(bytes32 indexed coverKey, bytes32 indexed productKey, address caller, address indexed burner, uint256 originalReward, uint256 burnedAmount)',
  'event ReporterRewardDistributed(bytes32 indexed coverKey, bytes32 indexed productKey, address caller, address indexed reporter, uint256 originalReward, uint256 reporterReward)',
  'event Unstaken(bytes32 indexed coverKey, bytes32 indexed productKey, address indexed caller, uint256 originalStake, uint256 reward)',
  'function getUnstakeInfoFor(address account, bytes32 coverKey, bytes32 productKey, uint256 incidentDate) view returns (tuple(uint256 totalStakeInWinningCamp, uint256 totalStakeInLosingCamp, uint256 myStakeInWinningCamp, uint256 toBurn, uint256 toReporter, uint256 myReward, uint256 unstaken))',
  'function unstake(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)',
  'function unstakeWithClaim(bytes32 coverKey, bytes32 productKey, uint256 incidentDate)'
]

const IVault = [
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Entered(bytes32 indexed coverKey, address indexed account)',
  'event Exited(bytes32 indexed coverKey, address indexed account)',
  'event FlashLoanBorrowed(address indexed lender, address indexed borrower, address indexed stablecoin, uint256 amount, uint256 fee)',
  'event GovernanceTransfer(address indexed to, uint256 amount)',
  'event InterestAccrued(bytes32 indexed coverKey)',
  'event NpmStaken(address indexed account, uint256 amount)',
  'event NpmUnstaken(address indexed account, uint256 amount)',
  'event PodsIssued(address indexed account, uint256 issued, uint256 liquidityAdded, bytes32 indexed referralCode)',
  'event PodsRedeemed(address indexed account, uint256 redeemed, uint256 liquidityReleased)',
  'event StrategyReceipt(address indexed token, address indexed strategy, bytes32 indexed name, uint256 amount, uint256 income, uint256 loss)',
  'event StrategyTransfer(address indexed token, address indexed strategy, bytes32 indexed name, uint256 amount)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function accrueInterest()',
  'function addLiquidity(tuple(bytes32 coverKey, uint256 amount, uint256 npmStakeToAdd, bytes32 referralCode) args)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function calculateLiquidity(uint256 podsToBurn) view returns (uint256)',
  'function calculatePods(uint256 forStablecoinUnits) view returns (uint256)',
  'function getInfo(address forAccount) view returns (tuple(uint256 totalPods, uint256 balance, uint256 extendedBalance, uint256 totalReassurance, uint256 myPodBalance, uint256 myShare, uint256 withdrawalOpen, uint256 withdrawalClose) info)',
  'function getName() pure returns (bytes32)',
  'function getStablecoinBalanceOf() view returns (uint256)',
  'function key() view returns (bytes32)',
  'function receiveFromStrategy(address token, bytes32 coverKey, bytes32 strategyName, uint256 amount)',
  'function removeLiquidity(bytes32 coverKey, uint256 amount, uint256 npmStake, bool exit)',
  'function sc() view returns (address)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
  'function transferGovernance(bytes32 coverKey, address to, uint256 amount)',
  'function transferToStrategy(address token, bytes32 coverKey, bytes32 strategyName, uint256 amount)',
  'function version() pure returns (bytes32)'
]

const IVaultDelegate = [
  'function accrueInterestImplementation(address caller, bytes32 coverKey)',
  'function calculateLiquidityImplementation(bytes32 coverKey, uint256 podsToBurn) view returns (uint256)',
  'function calculatePodsImplementation(bytes32 coverKey, uint256 forStablecoinUnits) view returns (uint256)',
  'function getFlashFee(address caller, bytes32 coverKey, address token, uint256 amount) view returns (uint256)',
  'function getInfoImplementation(bytes32 coverKey, address forAccount) view returns (tuple(uint256 totalPods, uint256 balance, uint256 extendedBalance, uint256 totalReassurance, uint256 myPodBalance, uint256 myShare, uint256 withdrawalOpen, uint256 withdrawalClose))',
  'function getMaxFlashLoan(address caller, bytes32 coverKey, address token) view returns (uint256)',
  'function getName() pure returns (bytes32)',
  'function getStablecoinBalanceOfImplementation(bytes32 coverKey) view returns (uint256)',
  'function postAddLiquidity(address caller, bytes32 coverKey, uint256 amount, uint256 npmStake)',
  'function postFlashLoan(address caller, bytes32 coverKey, address receiver, address token, uint256 amount, bytes data)',
  'function postReceiveFromStrategy(address caller, address token, bytes32 coverKey, bytes32 strategyName, uint256 amount) returns (uint256 income, uint256 loss)',
  'function postRemoveLiquidity(address caller, bytes32 coverKey, uint256 amount, uint256 npmStake, bool exit)',
  'function postTransferGovernance(address caller, bytes32 coverKey, address to, uint256 amount)',
  'function postTransferToStrategy(address caller, address token, bytes32 coverKey, bytes32 strategyName, uint256 amount)',
  'function preAddLiquidity(address caller, bytes32 coverKey, uint256 amount, uint256 npmStake) returns (uint256 podsToMint, uint256 previousNpmStake)',
  'function preFlashLoan(address caller, bytes32 coverKey, address receiver, address token, uint256 amount, bytes data) returns (address stablecoin, uint256 fee, uint256 protocolFee)',
  'function preReceiveFromStrategy(address caller, address token, bytes32 coverKey, bytes32 strategyName, uint256 amount)',
  'function preRemoveLiquidity(address caller, bytes32 coverKey, uint256 amount, uint256 npmStake, bool exit) returns (address stablecoin, uint256 stableCoinToRelease)',
  'function preTransferGovernance(address caller, bytes32 coverKey, address to, uint256 amount) returns (address stablecoin)',
  'function preTransferToStrategy(address caller, address token, bytes32 coverKey, bytes32 strategyName, uint256 amount)',
  'function version() pure returns (bytes32)'
]

const IVaultFactory = [
  'event VaultDeployed(address vault, bytes32 indexed coverKey, string name, string symbol)',
  'function deploy(bytes32 coverKey, string name, string symbol) returns (address)',
  'function getName() pure returns (bytes32)',
  'function version() pure returns (bytes32)'
]

const IWitness = [
  'event Attested(bytes32 indexed coverKey, bytes32 indexed productKey, address witness, uint256 indexed incidentDate, uint256 stake)',
  'event Refuted(bytes32 indexed coverKey, bytes32 indexed productKey, address witness, uint256 indexed incidentDate, uint256 stake)',
  'function attest(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, uint256 stake)',
  'function getStakes(bytes32 coverKey, bytes32 productKey, uint256 incidentDate) view returns (uint256, uint256)',
  'function getStakesOf(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, address account) view returns (uint256, uint256)',
  'function getStatus(bytes32 coverKey, bytes32 productKey) view returns (uint256)',
  'function isCoverNormal(bytes32 coverKey) view returns (bool)',
  'function refute(bytes32 coverKey, bytes32 productKey, uint256 incidentDate, uint256 stake)'
]

export {
  IAaveV2LendingPoolLike,
  IBondPool,
  IClaimsProcessor,
  ICompoundERC20DelegatorLike,
  ICover,
  ICoverReassurance,
  ICoverStake,
  ICoverUpdate,
  ICxToken,
  ICxTokenFactory,
  IERC20,
  IERC20Detailed,
  IFinalization,
  IGovernance,
  ILendingStrategy,
  ILiquidityEngine,
  IMember,
  IPausable,
  IPolicy,
  IPolicyAdmin,
  IPriceOracle,
  IProtocol,
  IRecoverable,
  IReporter,
  IResolution,
  IResolvable,
  IStakingPools,
  IStore,
  IUniswapV2FactoryLike,
  IUniswapV2PairLike,
  IUniswapV2RouterLike,
  IUnstakable,
  IVault,
  IVaultDelegate,
  IVaultFactory,
  IWitness
}
