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
    //funcion para crear el hash
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
        //Se obtiene el bloque anterior y su hash, luego el indice +1 para crear un bloque nuevo
        let prevBlock = this.getLastBlock();
        let prevHash= prevBlock.hash;
        let newIndex= prevBlock.index+1;
        let block= new Block(newIndex,data,prevHash);
        block.mine(this.difficulty);
        console.log('minado '+block.nonce+' con nonce '+block.nonce);
        this.chain.push(block);

    }

    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            let prevBlock= this.chain[i-1];
            let currentBlock= this.chain[i];
            // comprueba si el hash previo del bloque actual es diferente del hash del bloque anterior
            if (currentBlock.previosHash != prevBlock.hash) {
                return false;
            }
            //comprueba de los hash son iguales del bloque actual
            if (currentBlock.createHash() !=currentBlock.hash) {
                return false;
            }
            return true; 
        }
    }
}


//CREACIÓN DE LA CADENA DE BLOQUES
let Redes2Coin = new  BlockChain('info de genesis','00');


//SE AGREGAN 2 BLOQUES A LA CADENA CON SUS RESPECTIVOS DATOS
Redes2Coin.addBlock('Datos de bloque 1');
Redes2Coin.addBlock('Datos de bloque 2');
//IMPRIME LA INFORMACIÓN DE TODA LA CADENA DE BLOQUES
console.log(JSON.stringify(Redes2Coin,null,2)); 




//EL METODO isValid() ES PARA VERIFICAR LA INTEGRIDAD DE LOS DATOS
console.log(Redes2Coin.isValid());
Redes2Coin.chain[1].data ='fake data';
console.log(Redes2Coin.isValid());


