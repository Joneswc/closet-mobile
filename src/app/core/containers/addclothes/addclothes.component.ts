import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from './error.component';

@Component({
  selector: 'app-addclothes',
  templateUrl: './addclothes.component.html',
  styleUrls: ['./addclothes.component.scss']
})
export class AddclothesComponent implements OnInit {

  addClothesForm: FormGroup;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  loggingerror: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addClothesForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      // category: ['', Validators.required()]
    });
  }

  get f() {
    return this.addClothesForm.controls;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.submitted = true;
    if (this.addClothesForm.invalid) {
      console.log('validation error');
      return;
    }
  }

  onFocus(event: any) {
    this.loggingerror = null;
  }

  onReset() {
    this.submitted = false;
    this.addClothesForm.reset();
  }

}
