import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-matrix',
  templateUrl: './code-matrix.component.html',
  styleUrls: ['./code-matrix.component.sass']
})
export class CodeMatrixComponent implements OnInit {
  // 6x6 matrix, 6 verschiedene zeichen, kombination muss möglich sein
  exampleMatrix = [
    ['E9', 'E9', 'BD', '1C', '55', '55'],
    ['E9', 'E9', 'BD', '1C', '55', '55'],
    ['E9', 'E9', 'BD', '1C', '55', '55'],
    ['E9', 'E9', 'BD', '1C', '55', '55'],
    ['E9', 'E9', 'BD', '1C', '55', '55'],
    ['E9', 'E9', 'BD', '1C', '55', '55']
  ]
  matrix: string[][] = [];
  possibleValues = ['E9', 'BD', '1C', '55', '7A', 'FF']
  toggleXY = false;
  hoveredCol = 0;
  hoveredEl = '';
  buffer: string[] = ['','','',''];
  bufferClean: string[] = [];
  maxBuffer = 4;
  solution: string[][] = [];
  solveTry: string[][] = [];
  solvable = true;
  possibleSolutionCount = 4;

  constructor() { }

  ngOnInit(): void {
    this.randomize();
  }

  deck(size: number) {
    this.maxBuffer = size;
    this.buffer = [];
    for(let i = 0; i < this.maxBuffer; i++) this.buffer.push('');
  }

  randomize() {
    for(let i = 0; i < 6; i++) {
      for(let y = 0; y < 6; y++) {
        if(y == 0) this.matrix[i] = [];
        // fill matrix array
        this.matrix[i].push(this.possibleValues[this.rand(this.possibleValues.length)]);
      }
    }
    for(let i = 0; i < this.possibleSolutionCount; i++) {
      const possibleSolutionLength = this.rand(3,2);
      if(i == 0) this.solveTry = [];
      this.solveTry.push([]);
      for(let y = 0; y < possibleSolutionLength; y++) {
        if(y == 0) this.solution[i] = [];
        // fill solution array
        this.solution[i].push(this.possibleValues[this.rand(this.possibleValues.length)]);
      }
    }
  }

  clickedElement(el: any) {
    this.toggleXY = !this.toggleXY
    this.buffer.push(el.target.innerText);
    this.bufferClean = this.buffer.filter(x=>!!x);
    this.buffer = [...this.bufferClean];
    const cleanL = this.bufferClean.length;
    const bufferL = this.buffer.length;
    for(let i = 0; i < (this.maxBuffer - bufferL); i++) this.buffer.push('');
    if(this.buffer.length > this.maxBuffer) this.buffer.pop();

    // check if buffer contains solution
    if(!!cleanL) {
      for(let y = 0; y < this.solution.length; y++){
        for(let i = this.bufferClean.length; i > 0; i--) {
          if(this.bufferClean[this.bufferClean.length - i] == this.solution[y][0]) {
            const slice = this.bufferClean.slice(i-1, this.bufferClean.length);
            if (this.solution[y].toLocaleString().includes(slice.toLocaleString())) {
              this.solveTry[y].push(...slice);
            } else {
              this.solveTry[y] = [];
            }
          }
        }
      }
    }
    this.log(this.solveTry);
  }

  reset() {
    this.buffer = [];
    for(let i = 0; i < (this.maxBuffer - this.buffer.length); i++) this.buffer.push('');
    this.bufferClean = [];
    this.randomize();
  }

  rand(range: number, startAt = 0) {
    return (Math.floor(Math.random() * 10)) % range + startAt;
  }

  correct(nr: number){
    if (this.bufferClean.length == 0) return false;
    return this.bufferClean.toLocaleString().includes(this.solution[nr].toLocaleString())
  }

  // debugging
  log(text: any){
    console.log(text);
  }
}
