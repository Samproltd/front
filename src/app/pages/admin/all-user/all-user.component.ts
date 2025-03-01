import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css']
})
export class AllUserComponent implements OnInit {

  [x: string]: any;
  // [x: string]: any;

  // AllUser = {
  //   id: 0,
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: 0,
  // };
  AllUser: any[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.userService.getAllUser().subscribe({
      next: (data) => {
        // Check if the response is an object containing the array
        // Example: { users: [...] }
        if (Array.isArray(data)) {
          this.AllUser = data;
        } else if (data && data&& Array.isArray(data)) {
          this.AllUser = data;
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
      }
      }
