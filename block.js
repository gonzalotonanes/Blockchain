const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,data,previosHash = ''){
        this.index= index;
        this.date= new Date();
        this.data= data;
        this.previosHash=previosHash;
        this.hash= this.createHash();
        this.nonce=0;
    }

    createHash(){
        return SHA256(this.index + this.date + this.data +this.previosHash +this.nonce).toString();
    }
    mine(difficulty){
        while(!this.hash.startsWith(difficulty)){
            this.nonce++;
            this.hash= this.createHash();
        }
    }
}

class BlockChain{
    constructor(genesis,difficulty='00'){
        this.chain= [this.createFirstBlock(genesis)];
        this.difficulty=difficulty;
    }
    createFirstBlock(genesis){
    return new Block(0,genesis);
    }

    getLastBlock(){
        let lastPosition = this.chain.length-1;
        return this.chain[lastPosition];
    }
    addBlock(data){
        let prevBlock = this.getLastBlock();
        let newIndex= prevBlock.index+1;
        let prevHash= prevBlock.hash;
        let block= new Block(newIndex,data,prevHash);
        block.mine(this.difficulty);
        console.log('minado '+block.nonce+' con nonce '+block.nonce);
        this.chain.push(block);

    }

    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            let prevBlock= this.chain[i-1];
            let currentBlock= this.chain[i];

            if (currentBlock.previosHash != prevBlock.hash) {
                return false;
            }
            if (currentBlock.createHash() !=currentBlock.hash) {
                return false;
            }
            return true;

            
        }
    }
}
let Redes2Coin = new  BlockChain('info de genesis','000');

Redes2Coin.addBlock('Valgo 32k');
Redes2Coin.addBlock('Valgo 64k');
//console.log(Redes2Coin.isValid());
//Redes2Coin.chain[1].data ='fake data';
//console.log(Redes2Coin.isValid());
//console.log(JSON.stringify(Redes2Coin,null,2)); 
