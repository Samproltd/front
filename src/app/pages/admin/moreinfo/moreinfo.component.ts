// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-moreinfo',
//   templateUrl: './moreinfo.component.html',
//   styleUrls: ['./moreinfo.component.css']
// })
// export class MoreinfoComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.component.html',
  styleUrls: ['./moreinfo.component.css'],
})
export class MoreInfoComponent implements OnInit {
  studentId: any;
  studentDetails: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get student ID from URL
    this.studentId = this.route.snapshot.paramMap.get('id');

    // Fetch student details from backend
    // this.userService.getStudentById(this.studentId).subscribe(
    //   (data) => {
    //     this.studentDetails = data;
    //   },
    //   (error) => {
    //     console.error('Error fetching student details', error);
    //   }
    // );
  }
}
