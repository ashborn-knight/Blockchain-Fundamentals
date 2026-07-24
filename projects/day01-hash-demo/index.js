const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp,data,previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];

    }

    createGenesisBlock(){
        return new Block (0, "24/07/2026","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }

    isChainValid(){
        for(let i = 1; i < this.chain.length ; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateeHash()){
                return false;
            }

            if(currentBlock.previousBlock !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let KenCoin = new Blockchain();
KenCoin.addBlock(new Block(1, "24/07/2026", {amount: 100},));
KenCoin.addBlock(new Block(2, "5/07/2026", {amount: 1100},));

console.log("Is Blockchain valid : " + KenCoin.isChainValid());

//console.log(JSON.stringify(KenCoin,null, 4));