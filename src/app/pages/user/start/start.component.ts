import { LocationStrategy } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  public result = {
    id: 0,
    marksGot: 0,
    correctAnswers: 0,
    attempted: 0,
    userid: 0,
    firstName: '',
    lastName: '',
    examName: '',
  };


  public email={
    name:'',
    to:'',
    subject:''
  }

  qid: any;
  questions: any[] = [];

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

  isSubmit = false;

  timer: any;

  isLoggedIn = false;
  user = null;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    public login: LoginService,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });

    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions() {
    this.questions = [];
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 1 * 60;

        console.log(this.questions);
        this.startTimer();
      },

      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of Exam', 'error');
      }
    );
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the Exam?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    //calculation
    //call to sever  to check questions
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = data.marksGot;
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );
    this.isSubmit = true;
    this.questions.forEach((q: { givenAnswer: string; answer: any }) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        let marksSingle =
          this.questions[0].quiz.maxMarks / this.questions.length;

        this.marksGot += marksSingle;
      }
      // if (q.givenAnswer.trim() != '') {
      //   this.attempted++;
      // }

      if (q.givenAnswer && q.givenAnswer.trim() !== '') {
        this.attempted++;
      }
    });
    console.log('Correct Answers :' + this.correctAnswers);
    console.log('Marks Got ' + this.marksGot);
    console.log('attempted ' + this.attempted);
    console.log(this.questions[0].quiz.title);

    this.result.marksGot = this.marksGot;
    this.result.attempted = this.attempted;
    this.result.correctAnswers = this.correctAnswers;
    this.result.firstName = this.user.firstName;
    this.result.lastName = this.user.lastName;
    this.result.userid = this.user.id;
    this.result.examName = this.questions[0].quiz.title;

    //
    this.email.to=this.user.username;
    this.email.name=this.user.firstName+ " " + this.user.lastName;
    this.email.subject="Welcome...! "+ this.user.firstName + " " +  this.user.lastName;

    this.AddResult();
    this.sendEmailResult();
  }
  // add result

  AddResult() {
    this.resultService.addResult(this.result).subscribe((data: any) => {});
    console.log('Result Added Successfully....!');
  }


  sendEmailResult() {
    this.resultService.sendEmailResult(this.email).subscribe((data: any) => {});
    console.log('Email Sending Scessfully....!');
  }
}
