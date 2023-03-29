"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const ethers_1 = require("ethers");
var JsonRpcProvider = ethers_1.ethers.JsonRpcProvider;
var Wallet = ethers_1.ethers.Wallet;
var Contract = ethers_1.ethers.Contract;
dotenv.config();
const privateKey = (_a = process.env.PRIVATE_KEY) !== null && _a !== void 0 ? _a : 'stub';
const goerliRpc = 'https://eth-goerli.public.blastapi.io';
const scrollRpc = 'https://alpha-rpc.scroll.io/l2';
const bridgeContractAddress = '0xe5E30E7c24e4dFcb281A682562E53154C15D3332';
const goerliProvider = new JsonRpcProvider(goerliRpc);
const goerliSigner = new Wallet(privateKey, goerliProvider);
const scrollProvider = new JsonRpcProvider(scrollRpc);
// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const bridgeAbi = `
[
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"l1Token",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"l2Token",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"from",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"address",
            "name":"to",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"amount",
            "type":"uint256"
         },
         {
            "indexed":false,
            "internalType":"bytes",
            "name":"data",
            "type":"bytes"
         }
      ],
      "name":"DepositERC20",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"from",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"to",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"amount",
            "type":"uint256"
         },
         {
            "indexed":false,
            "internalType":"bytes",
            "name":"data",
            "type":"bytes"
         }
      ],
      "name":"DepositETH",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"l1Token",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"l2Token",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"from",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"address",
            "name":"to",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"amount",
            "type":"uint256"
         },
         {
            "indexed":false,
            "internalType":"bytes",
            "name":"data",
            "type":"bytes"
         }
      ],
      "name":"FinalizeWithdrawERC20",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"from",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"to",
            "type":"address"
         },
         {
            "indexed":false,
            "internalType":"uint256",
            "name":"amount",
            "type":"uint256"
         },
         {
            "indexed":false,
            "internalType":"bytes",
            "name":"data",
            "type":"bytes"
         }
      ],
      "name":"FinalizeWithdrawETH",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"previousOwner",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"newOwner",
            "type":"address"
         }
      ],
      "name":"OwnershipTransferred",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"defaultERC20Gateway",
            "type":"address"
         }
      ],
      "name":"SetDefaultERC20Gateway",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"token",
            "type":"address"
         },
         {
            "indexed":true,
            "internalType":"address",
            "name":"gateway",
            "type":"address"
         }
      ],
      "name":"SetERC20Gateway",
      "type":"event"
   },
   {
      "anonymous":false,
      "inputs":[
         {
            "indexed":true,
            "internalType":"address",
            "name":"ethGateway",
            "type":"address"
         }
      ],
      "name":"SetETHGateway",
      "type":"event"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "name":"ERC20Gateway",
      "outputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   },
   {
      "inputs":[
         
      ],
      "name":"defaultERC20Gateway",
      "outputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_token",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"_amount",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"_gasLimit",
            "type":"uint256"
         }
      ],
      "name":"depositERC20",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_token",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"_to",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"_amount",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"_gasLimit",
            "type":"uint256"
         }
      ],
      "name":"depositERC20",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_token",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"_to",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"_amount",
            "type":"uint256"
         },
         {
            "internalType":"bytes",
            "name":"_data",
            "type":"bytes"
         },
         {
            "internalType":"uint256",
            "name":"_gasLimit",
            "type":"uint256"
         }
      ],
      "name":"depositERC20AndCall",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"uint256",
            "name":"_amount",
            "type":"uint256"
         },
         {
            "internalType":"uint256",
            "name":"_gasLimit",
            "type":"uint256"
         }
      ],
      "name":"depositETH",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_to",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"_amount",
            "type":"uint256"
         },
         {
            "internalType":"bytes",
            "name":"_data",
            "type":"bytes"
         },
         {
            "internalType":"uint256",
            "name":"_gasLimit",
            "type":"uint256"
         }
      ],
      "name":"depositETHAndCall",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         
      ],
      "name":"ethGateway",
      "outputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         },
         {
            "internalType":"bytes",
            "name":"",
            "type":"bytes"
         }
      ],
      "name":"finalizeWithdrawERC20",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         },
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         },
         {
            "internalType":"bytes",
            "name":"",
            "type":"bytes"
         }
      ],
      "name":"finalizeWithdrawETH",
      "outputs":[
         
      ],
      "stateMutability":"payable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_token",
            "type":"address"
         }
      ],
      "name":"getERC20Gateway",
      "outputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_l1Address",
            "type":"address"
         }
      ],
      "name":"getL2ERC20Address",
      "outputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_ethGateway",
            "type":"address"
         },
         {
            "internalType":"address",
            "name":"_defaultERC20Gateway",
            "type":"address"
         }
      ],
      "name":"initialize",
      "outputs":[
         
      ],
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "inputs":[
         
      ],
      "name":"owner",
      "outputs":[
         {
            "internalType":"address",
            "name":"",
            "type":"address"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   },
   {
      "inputs":[
         
      ],
      "name":"renounceOwnership",
      "outputs":[
         
      ],
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_defaultERC20Gateway",
            "type":"address"
         }
      ],
      "name":"setDefaultERC20Gateway",
      "outputs":[
         
      ],
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address[]",
            "name":"_tokens",
            "type":"address[]"
         },
         {
            "internalType":"address[]",
            "name":"_gateways",
            "type":"address[]"
         }
      ],
      "name":"setERC20Gateway",
      "outputs":[
         
      ],
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"_ethGateway",
            "type":"address"
         }
      ],
      "name":"setETHGateway",
      "outputs":[
         
      ],
      "stateMutability":"nonpayable",
      "type":"function"
   },
   {
      "inputs":[
         {
            "internalType":"address",
            "name":"newOwner",
            "type":"address"
         }
      ],
      "name":"transferOwnership",
      "outputs":[
         
      ],
      "stateMutability":"nonpayable",
      "type":"function"
   }
]
`;
//TODO hardhat-ether getContractAt WITHOUT ABI https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-ethers#helpers
const goerliBridgeContract = new Contract(bridgeContractAddress, bridgeAbi, goerliSigner);
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const blockNumber = yield scrollProvider.getBlockNumber();
        console.info(blockNumber);
    });
}
function estimateGas(provider) {
    return __awaiter(this, void 0, void 0, function* () {
        const block = yield provider.getBlock('latest');
        console.info(block);
    });
}
function bridgeGoerliToScroll() {
    return __awaiter(this, void 0, void 0, function* () {
        const test = 123;
        // const gas = estimateGas(goerliProvider);
        const result = yield goerliBridgeContract.depositETH(100000, 40000, { gasLimit: 40000, value: 1000000 });
        console.info(result);
    });
}
test();
// estimateGas(goerliProvider);
bridgeGoerliToScroll();
