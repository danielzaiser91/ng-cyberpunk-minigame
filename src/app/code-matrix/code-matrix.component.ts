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
        this.matrix[i].push(this.possibleValues[this.rand(6)]);
      }
    }
    for(let i = 0; i < 2; i++) {
      for(let y = 0; y < 3; y++) {
        if(y == 0) this.solution[i] = [];
        this.solution[i].push(this.possibleValues[this.rand(6)]);
      }
    }
  }
  clickedElement(el: any) {
    this.toggleXY = !this.toggleXY
    this.buffer.push(el.target.innerText);
    this.bufferClean = this.buffer.filter(x=>!!x);
    this.buffer = [...this.bufferClean];
    const length = this.buffer.length;
    for(let i = 0; i < (this.maxBuffer - length); i++) this.buffer.push('');
    if(this.buffer.length > this.maxBuffer) this.buffer.pop();
  }
  reset() {
    this.buffer = ['','','',''];
    this.bufferClean = [];
    this.randomize();
  }
  rand(range: number, startAt = 0) {
    return (Math.floor(Math.random() * 10) % range) + startAt;
  }
  correct(nr: number){
    if (this.bufferClean.length == 0) return false;
    return this.bufferClean.toLocaleString().includes(this.solution[nr].toLocaleString())
  }
  log(text: any){
    console.log(text);
  }
}
