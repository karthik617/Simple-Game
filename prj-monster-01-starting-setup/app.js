function getValue(min,max){
    return Math.floor(Math.random() * (max-min))+ min
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth : 100,
            monsterHealth : 100,
            counter : 0,
            winner: null,
            logMessages:[]
        };
    },
    computed:{
        monsterBarValue() {
            if(this.monsterHealth <= 0){
                return {width:'0%'}
            }
            return {width:this.monsterHealth + '%'}
        },
        playerBarValue() {
            if(this.playerHealth <= 0){
                return {width:'0%'}
            }
            return {width:this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.counter % 3 !== 0
        },
        // displayGameOver(){
        //     if(this.monsterHealth === 0 || this.playerHealth === 0){
        //         return true
        //     }else{
        //         return false
        //     }
        // }
    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'player'
            }
        }
    },
    methods:{
        attackMonster(){
            this.counter++
            const attackValue = getValue(5,12)
            // if(this.monsterHealth - attackValue < 0){
            //     this.monsterHealth = 0
            // }else{
            //     this.monsterHealth -= attackValue
            // }
            this.monsterHealth -= attackValue
            this.attackPlayer()
            // this.gameOver()
            this.addlogMessages('player','attacked',attackValue)
        },
        attackPlayer(){
            const attackValue = getValue(8,15)
            this.playerHealth -= attackValue
            // if(this.playerHealth - attackValue < 0){
            //     this.playerHealth = 0
            // }else{
            //     this.playerHealth -= attackValue
            // }
            this.addlogMessages('monster','attacked',attackValue)
            
        },
        specialPlayerAttack(){
            this.counter++
            const attackValue = getValue(8,20)
            // if(this.monsterHealth - attackValue < 0){
            //     this.monsterHealth = 0
            // }else{
            //     this.monsterHealth -= attackValue
            // }
            this.monsterHealth -= attackValue
            this.attackPlayer()
            // this.gameOver()
            this.addlogMessages('player','attacked',attackValue)
        },
        healPlayer(){
            this.counter++
            const healValue = getValue(8,15)
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue
            }
            this.attackPlayer()
            // this.gameOver()
            this.addlogMessages('player','healed',healValue)
        },
        startNewGame(){
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.winner = null,
            this.counter = 0,
            this.logMessages = []

        },
        surrender(){
            this.winner = 'monter',
            this.playerHealth = 0
        },
        addlogMessages(who, what, value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            })
        }


        // gameOver(){
        //     console.log(this.monsterHealth)
        //     console.log(this.playerHealth)
        //     if(this.monsterHealth === 0){
        //         console.log('Player Wins')
        //     }else if(this.playerHealth === 0){
        //         console.log('Monter Wins')
        //     }else if(this.playerHealth === 0 && this.monsterHealth === 0){
        //         console.log('Draw')
        //     }
        // }
    }
});

app.mount("#game");