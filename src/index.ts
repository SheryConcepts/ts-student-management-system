import inquirer from "inquirer";
import {generateFromEmail} from "unique-username-generator";


class Student {

    public balance: number;
    public courses?: string[];
    public studentID: string;

    constructor(
        public name: string,
        public email: string,
    ){
        this.balance = Math.floor(Math.random() * (500 - 100)) + 100;
        this.studentID = generateFromEmail(email, 3);
    }

    enroll() {
        inquirer.prompt([
            {
                type: "checkbox",
                name: 'courses',
                choices: [
                    {name: "Math"},
                    {name: "Physics"},
                    {name: "Chemistry"},
                    {name: "English"},
                    {name: "Computer Science"},
                ],
                message: "Choose your courses",
            }
        ]).then(
            (v) => {
                this.courses = v.courses;
                console.log(`Current Enrolled Courses: ${this.courses}`)
                this.homepage();
            }
        )
    }

    view_balance(){
        console.log(`Your current balance is ${this.balance}`)
        this.homepage();
    }

    pay_tuition_fees(){
        this.balance - 50;
        console.log(`Your balance is reducted by 50 and your current balance is ${this.balance}`)
        this.homepage();
    }

    show_status() {
        console.log(
            ` Student ID: ${this.studentID}\n Name: ${this.name}\n Email: ${this.email}\n Courses Enrolled: ${this.courses}\n Balance: ${this.balance}\n`
        )
        this.homepage();
    }

    homepage() {
        inquirer.prompt(
            [
                {
                    type: "list",
                    name: "option",
                    message: "Home",
                    choices: [
                        "Show Status",
                        "View Balance",
                        "Pay tuition fees",
                        "Enroll more courses",
                        "Logout"
                    ]
                }
            ]
        ).then(
            (v) => {
                if (v.option === "Show Status") {
                    this.show_status();
                }
                if (v.option === "View Balance") {
                    this.view_balance();
                }
                if (v.option === "Pay tuition fees") {
                    this.pay_tuition_fees();
                }
                if (v.option === "Enroll more courses") {
                    this.enroll();
                }
                if (v.option === "Logout") {
                    this.logout();
                }
            }
        )
}

    logout() {
        console.log("Bye see you again");
    }
}

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "enter your name",
    },
    {
        type: 'input',
        name: 'email',
        message: "enter your email",
    },
]).then(
    (answers) => {
        const {name, email} = answers;
        const student = new  Student(name, email);
        student.enroll();
    }
)
