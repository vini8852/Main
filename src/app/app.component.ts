import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameMode=1; //1 for play mode 0 for pattern checking mode -1 for hiding both buttons
  level=1;
  squares=[-1,-1,-1,-1];
  results=[0,1,2,3];
  colorArray=["red","blue","green","orange","yellow","brown","black","pink","violet","grey"];
  
  playSequence(){
    alert("Now a sequence of colour would be played after the sequence completes you need to arrange the given square with same colour sequence. You can change the colour of square by clicking on it.");
    this.shuffle(this.colorArray);
    this.shuffle(this.results);
    this.gameMode=-1;
    for(let i=0;i<this.squares.length;i++){
      setTimeout(()=>{
        this.squares[i]=this.results[i];
        setTimeout(()=>{
          this.squares[i]=-1;
          if(i==this.squares.length-1){
            this.gameMode=0;
          }
        },500);
      },500*i);
    }
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
  }

  increaseLevel(){
    if(this.level==10){
      alert("Congratulations! you have completed the whole game.");
      this.resetLevel();
    }else{
      this.level++;
      this.squares=[];
      this.results=[]
      for(let i=0;i<this.level+3;i++){
        this.squares.push(-1);
        this.results.push(i);
      }
    }
  }

  resetLevel(){
    this.level=1;
    this.squares=[-1,-1,-1,-1];
    this.results=[0,1,2,3];
  }

  changeColorOfSquare(index){
    if(this.gameMode==1){
      return;
    }
    if(this.squares[index]>=this.colorArray.length){
      this.squares[index]=0;
    }else if(this.squares[index]==-1){
      this.squares[index]=Math.floor(Math.random() * 10);
    }else{
      this.squares[index]++;
    }
  }

  checkPattern(){
    this.gameMode=1;
    for(let i=0;i<this.squares.length;i++){
      if(this.squares[i]!=this.results[i]){
        alert("Sorry wrong pattern! You will have to start playing from level 1 again");
        this.resetLevel();
        return;
      }
    }
    alert("Congratulations! You have successfully completed this level");
    this.increaseLevel();
  }
}
