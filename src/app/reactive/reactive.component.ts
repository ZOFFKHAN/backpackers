
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
 
 
@Component({
  templateUrl: './reactive.component.html',
})
export class ReactiveComponent implements OnInit {
  title = 'Reactive Forms';
  reactiveForm: FormGroup;
 
  countryList: country[] = [
    new country("1", "India"),
    new country('2', 'USA'),
    new country('3', 'England')
  ];
 
  // reactiveForm = new FormGroup({
  //   firstname: new FormControl('Sachin'),
  //   lastname: new FormControl('Tendulkar'),
  //   email: new FormControl('sachin@gmail.com'),
  //   gender: new FormControl('male'),
  //   isMarried: new FormControl(true),
  //   country: new FormControl('2'),
  //   address:new FormGroup({
  //     city: new FormControl("Mumbai"),
  //     street: new FormControl("Perry Cross Rd"),
  //     pincode:new FormControl("400050")
  //   })
  // })
 
  constructor(private fb:FormBuilder) {
 
    this.reactiveForm = this.fb.group({
      
      firstname: ['', [Validators.required, Validators.minLength(10)]],
      lastname: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      isMarried: ['', [Validators.required]],
      country: ['', [Validators.required]],
      skills: this.fb.array([]) ,
      address: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        pincode: ['', [Validators.required]]
      })
        
      
  });
 }
 
  onSubmit() {
    /**console.log(this.reactiveForm.value);**/
 
this.reactiveForm.get("firstname").valueChanges.subscribe(selectedValue => {
  console.log('firstname value changed')
  console.log(selectedValue)
  console.log(this.reactiveForm.get("firstname").value)
  console.log(this.reactiveForm.value)    //shows the old first name
      
  setTimeout(() => {
    console.log(this.reactiveForm.value)   //shows the latest first name
  })
     
})

  }
 
  ngOnInit() {
    this.setDefault();
  }
 
  setDefault() {
 
    let contact = {
      firstname: "Sachin",
      lastname: "Tendulkar",
      email: "sachin@gmail.com",
      gender: "male",
      isMarried: true,
      country: "2",
      skills: this.fb.array ([]) ,
      address: {
        city: "Mumbai",
        street: "Perry Cross Rd",
        pincode: "400050"
      }
    };
 
    this.reactiveForm.setValue(contact);
  }
 
  setValue() {
 
    let contact = {
      firstname: "Rahul",
      lastname: "Dravid",
      email: "rahul@gmail.com",
      gender: "male",
      isMarried: true,
      country: "1",
      address: {
        city: "Bangalore",
        street: "Brigade Road",
        pincode: "600070"
      }
    };
 
    this.reactiveForm.setValue(contact);
  }
 
  setAddress() {
 
    let address= {
      city: "Bangalore",
      street: "Brigade Road",
      pincode: "600070",
    };
 
    this.reactiveForm.get("address").setValue(address);
 
  };
 
  setCountry() {
 
    this.reactiveForm.get("country").setValue("1");
 
  };
 
 
  patchAddress() {
 
    let address= {
      city: "Bangalore",
      street: "Brigade Road",
      //pincode: "600070",
      //firstname:'saurv'
    };
 
    this.reactiveForm.get("address").patchValue(address);
 
  }
 
  patchName() {
    let contact = {
      firstname: "Rahul",
      lastname: "Dravid",
    }
 
    this.reactiveForm.patchValue(contact);
 
  }
 
  reset() {
    this.reactiveForm.reset();
  }

  get skills() : FormArray {
    return this.reactiveForm.get("skills") as FormArray
  }  
  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    })
  }
 
  addSkills() {
    this.skills.push(this.newSkill());
  }
 

  
  removeSkill(i:number) {
    this.skills.removeAt(i);
  }
 
 
  


  
}
 
export class country {
  id: string;
  name: string;
 
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
