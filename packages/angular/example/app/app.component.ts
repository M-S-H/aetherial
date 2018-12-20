import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AvNotificationsService } from '../../src/notifications/notifications.service';
import { FormBuilder, Validators } from '@angular/forms';
import { randomColor } from '../../src/shared/color';
import * as md5 from 'md5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  showModal = false;

  checkboxValue = false;
  checkboxgroupValue = [1, 3];

  selectValues = [];
  selectedValue = null;

  formStuff = null;

  thing: 'one';

  // tslint:disable-next-line:max-line-length
  names = ['Steven Salcido', 'Sung Choi', 'Charlotte Ruiloba', 'Daniel Begay', 'Megan Thienel', 'Stacie Kirtley', 'Anna Mae Apodaca', 'Laura Valdez', 'Juan Carlos Baca', 'Octavio Munoz', 'Alejandro Sandoval', 'Shannon Yazzie', 'Donna Finley', 'Casey Thompson', 'Daniel Forman', 'Mary Phibbs', 'Angelica Lopez', 'Laticia Kewanwytewa', 'Kacie Deines', 'Brian McCray', 'Hank Spellman', 'Janine Bowekaty', 'Marianne Cruz Martinez', 'Karena Washington', 'Maria Olivas', 'Kelley Parker', 'An Rael', 'Victoria Stone', 'Jowell Jameson', 'Max Bloom', 'Colin Leslie', 'Maria Day', 'Heather Welch', 'Nicole Tom', 'Nicole Plummer', 'Kevin McConnell', 'Isaac Ibarra', 'Monique Curley', 'Matthew Vallejos', 'Madison Harris', 'Brian Beall', 'Kathryn Vigil', 'Katherine Williams', 'Ashton Whaley', 'Maria Quintana', 'Anna Nunn', 'Nichelle Gilbert', 'Aiden Anderson', 'Dustin Perriguey', 'David Lucero', 'Lauren Moore', 'Beverly Shead', 'Jennifer Crabb', 'Derek Sokoloff', 'Kelly Miller', 'Andrea West', 'Jennifer Ruden', 'Jacob Delgado', 'Cory Gray', 'Beth Jones', 'Samuel Feil', 'Matthew Tafoya', 'Celeste Gaddy', 'Marlene Trujillo', 'Adrian Kemper', 'Maria Haack', 'Matthew Wilder', 'Adrian Jaramillo', 'Lucy Cummings', 'Mayra Rendon', 'Deborah Boyles', 'Nichole Chavez', 'Judith Grano', 'Monica Kowal', 'Josephine Plummer', 'Celeste Kovach', 'Ashley Baca', 'Elizabeth Thompson', 'Marc Gonzales', 'Megan Lunsford', 'Tracy Skipp', 'Ricardo Romero', 'Erin Jarry', 'Natalie Solis', 'Jason Kimble', 'Joyce Krantman', 'Elannah Venhaus', 'Robert Olds', 'Stevee McIntyre', 'Clare Stott', 'Sheryl Dee', 'Dawn Blue-Sky', 'James Silversmith', 'Brian Vineyard', 'Marie Cling', 'George Vantrease', 'Carmen Dishta', 'Jonathan Chavez', 'Alecka Seowtewa', 'Early-Ray Mixon', 'Marquis Garcia', 'Allen Wickenkamp', 'Erika Herrera', 'Alicia Burton', 'Shirley Chinana', 'Leef Crawford', 'Veronica Griego', 'Regina Herbert', 'Jennifer Alex', 'Candace Baca', 'Amanda Vinson', 'Denise Portell', 'Duane Tsinigine', 'Cristin Oney', 'Martina Peterson', 'Bradford Beck', 'Monique Rivera', 'Laura Musselwhite', 'Melanie Benedetto', 'Jennifer Nielsen', 'Andrew Chu', 'Ryan Moore', 'Zachary Plohr', 'Albert Flores', 'Matthew Reisen', 'Loren Smith', 'Taylor Henderson', 'Warren Budd', 'Jazmine Goodman', 'Athena Combs-Hurtado', 'Phoebe Nichols', 'Avelina Martinez', 'Erica Holmes-Trujillo', 'Bryan Blacker', 'Kaitlin Nash', 'Lisa Herrera', 'Jaime Loera', 'Hank Vigil', 'Michelle Gallegos', 'Jayme McMahon', 'Tonya Thacker', 'Hilary Briggs', 'Jacqueline Kocer', 'Brandy Fewell', 'Rick Bustos', 'Correen Talley', 'Dustin Salazar', 'Elizabeth Rademacher', 'Nick Brokeshoulder', 'Vickie Alvarez', 'Lisa Isaacs', 'Christal Garcia', 'Randi Archuleta', 'Valdis Garoza', 'Joseph Burgess', 'Rosa Auletta', 'Jamey Cook', 'Joshua Owen', 'Lorenzo Anzalone', 'Andrea Botero-Tompkins', 'Ashley Truong', 'Audrey Almodovar', 'Eric Gonzales', 'Erika Marquez', 'Ryan McNiff', 'Joseph Stevens', 'Andrea Martinez Schachtner', 'Adam Mitchell', 'Sheila Hong', 'Nicholas Marler', 'Steven Blacksmith', 'Phoebe Morgan', 'Jacqueline Keating', 'Ted McDaniel', 'Kristian Lewis', 'Johnathon Thompson', 'Alexa Morgan', 'Nicholas Olson', 'Jonathan Lewis', 'Andrea Gorman', 'Jerica Gonzales', 'Serouj Bingham', 'Alexander Smith', 'Maria Little', 'Tanya Rafelito', 'Shelley Arnold', 'Tuan Doan', 'Lucero Galaviz', 'Kerry Howe', 'Angelo Rivera', 'Patricia Yara', 'Sara Macneil', 'Ana Vigil', 'Janell Valdez', 'Michael Hess', 'Davette De La O-Sandoval', 'Desarae Jenkins', 'Dannette Lopez', 'Melanie Dugas', 'Jesus Salazar', 'Natasha Hutchinson'];

  constructor(private notificationsService: AvNotificationsService, private fb: FormBuilder) {
    this.formStuff = fb.group({
      selectedValue: [],
      otherthing: [null]
    });
  }


  ngOnInit() {
    this.names = this.names.sort((a, b) => md5(a).substr(5, 6) > md5(b).substr(5, 6) ? 1 : -1);
  }


  color(x: string) {
    return randomColor(x);
  }
}
