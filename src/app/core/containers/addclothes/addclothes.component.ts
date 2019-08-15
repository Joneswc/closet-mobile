import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from './error.component';
import {Action} from '@ngrx/store';
import {createItem} from '../../../closet/store/actions/items.actions';

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

  @Output()
  actionEmmiter = new EventEmitter<Action>();

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

  onSubmit() {
    console.log(this.addClothesForm.value);
    this.submitted = true;
    if (this.addClothesForm.invalid) {
      console.log('validation error');
      return;
    }
    this.actionEmmiter.emit(createItem({clothes: this.addClothesForm.value}));
  }

  onFocus(event: any) {
    this.loggingerror = null;
  }

  onReset() {
    this.submitted = false;
    this.addClothesForm.reset();
  }

}
