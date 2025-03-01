import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar, private router: Router) {}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: ''
  };

  selectedFile: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      // Preview Image
      const reader = new FileReader();
      reader.onload = (e) => (this.photoPreview = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  formSubmit() {
    if (!this.user.username || !this.user.password) {
      this.snack.open('Email and Password are required!', '', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('email', this.user.email);
    formData.append('phone', this.user.phone);
    formData.append('userType', this.user.userType);

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.userService.addUser(formData).subscribe(
      (data: any) => {
        Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.log(error);
        this.snack.open(error.error.text, '', { duration: 3000 });
      }
    );
  }
}