import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecisionTreeService } from '../services/decision-tree.service';
import { LoadingDotsComponent } from '../components/loading-dots/loading-dots.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingDotsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewChecked {
  @ViewChild('chatMessages') private chatMessages!: ElementRef;
  
  userMessage = '';
  messages: Array<{text: string, isBot: boolean, isQuestion?: boolean, isLoading?: boolean}> = [
    { text: "Hello! I'm your health assistant. I can help you assess cognitive health concerns. Would you like to start the assessment? (Type 'yes' to begin)", isBot: true }
  ];
  currentNode: any;
  isInAssessment = false;
  currentQuestion = '';
  isLoading = false;
  isAssessmentComplete = false;

  constructor(private decisionTreeService: DecisionTreeService) {
    this.currentNode = this.decisionTreeService.getTree();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private async addMessageWithDelay(message: {text: string, isBot: boolean, isQuestion?: boolean}) {
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1200));
    this.messages.push(message);
    this.isLoading = false;
    this.scrollToBottom();
  }

  async sendMessage() {
    if (this.userMessage.trim() && !this.isAssessmentComplete) {
      const message = this.userMessage.trim().toLowerCase();
      
      // Add user message
      this.messages.push({ text: this.userMessage, isBot: false });
      
      // Clear input
      this.userMessage = '';

      if (!this.isInAssessment) {
        if (message === 'yes') {
          this.isInAssessment = true;
          this.currentQuestion = this.currentNode.question;
          await this.addMessageWithDelay({ 
            text: `${this.currentQuestion}\n\nPlease respond with 'yes' or 'no'.`, 
            isBot: true, 
            isQuestion: true 
          });
        } else {
          await this.addMessageWithDelay({ 
            text: "Please type 'yes' when you're ready to begin the assessment.", 
            isBot: true 
          });
        }
      } else {
        if (message === 'yes' || message === 'no') {
          // Add the user's answer to the current question
          await this.addMessageWithDelay({ 
            text: `Your answer to "${this.currentQuestion}": ${message}`, 
            isBot: true 
          });

          if (typeof this.currentNode[message] === 'string') {
            // We've reached a conclusion
            await this.addMessageWithDelay({ text: this.currentNode[message], isBot: true });
            this.isAssessmentComplete = true;
            this.isInAssessment = false;
            this.currentNode = this.decisionTreeService.getTree();
            this.currentQuestion = '';
          } else {
            // Move to next question
            this.currentNode = this.currentNode[message];
            this.currentQuestion = this.currentNode.question;
            await this.addMessageWithDelay({ 
              text: `${this.currentQuestion}\n\nPlease respond with 'yes' or 'no'.`, 
              isBot: true, 
              isQuestion: true 
            });
          }
        } else {
          await this.addMessageWithDelay({ 
            text: "Please answer with 'yes' or 'no' only.", 
            isBot: true 
          });
        }
      }
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch(err) { }
  }
} 