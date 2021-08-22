import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  dark = true;
  formMessage = "";
  messageColor = "var(--link-color)";

  formSubmitted = false;
  age: any;

  contactForm = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });


  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Check if form was successfully
    if (this.route.snapshot.queryParamMap.get('sent') == "success") {
      this.formMessage = "Successfully sent message."
      this.messageColor = "var(--button-background)";
    }

    // Calc Age
    let birth = new Date("09/18/2001");
    console.log(birth);
    const timeDiff = Math.abs(Date.now() - birth.getTime());
    this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

  onFormSubmit(): void {
    let url = "https://formsubmit.co/contact@felixniedermann.ch";
    let data = this.contactForm.value;
    // this.http.post(url, data).subscribe((response) => {
    //   window.open(`${url}?data=${encodeURI(data)}`, `_blank`)
    // })

    var form = document.createElement("form");
    form.target = "view";
    form.method = "POST";
    form.action = url;

    for (var i in data) {
        if (data.hasOwnProperty(i)) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = i;
          input.value = data[i];
          form.appendChild(input);
        }
    }

    document.body.appendChild(form);
    form.submit();
    window.open('', 'view');
    form.remove();
    this.contactForm.reset();
  }

  toggleTheme() {
    this.dark = !this.dark;
    console.log(this.dark);
  }
}

// export class Form {
//   constructor(
//     public name: string,
//     public email: string,
//     public message: string,
//     public phone?: string,
//   ){}
// }