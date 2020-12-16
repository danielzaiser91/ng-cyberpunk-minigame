import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-matrix',
  templateUrl: './code-matrix.component.html',
  styleUrls: ['./code-matrix.component.sass']
})
export class CodeMatrixComponent implements OnInit {
  // 6x6 matrix, 5 verschiedene zeichen, kombination von 2-4, muss möglich sein
  exampleMatrix = [
    ["E9", "E9", "BD", "1C", "55", "55"],
    ["E9", "E9", "BD", "1C", "55", "55"],
    ["E9", "E9", "BD", "1C", "55", "55"],
    ["E9", "E9", "BD", "1C", "55", "55"],
    ["E9", "E9", "BD", "1C", "55", "55"],
    ["E9", "E9", "BD", "1C", "55", "55"]
  ]
  possibleValues = ["E9", "BD", "1C", "55", "7A"]
  toggleXY = false;
  hoveredId = 0;
  buffer: string[] = ["","","",""];
  bufferClean: string[] = ["","","",""];
  maxBuffer = 4;
  solution: string[] = ["E9", "BD", "1C"];
  constructor() { }

  ngOnInit(): void {
  }

  clickedElement(el: any) {
    this.toggleXY = !this.toggleXY
    this.bufferClean = this.buffer.filter(x=>!!x);
    this.buffer = [...this.bufferClean];
    this.buffer.push(el.target.innerText);
    const length = this.buffer.length;
    for(let i = 0; i <= (this.maxBuffer - length); i++) this.buffer.push("");
    if(this.buffer.length > this.maxBuffer) this.buffer.pop();
  }
  reset() {
    this.buffer = ["","","",""]
  }
  rand() {
    return Math.floor(Math.random() * 10);
  }
  correct(){
    return this.bufferClean.toLocaleString().includes(this.solution.toLocaleString())
  }
  corrected(){
    console.log(this.bufferClean, this.solution, this.correct());
  }
}
