import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecisionTreeService {
  private tree = {
    question: "Does the person frequently forget recent events?",
    yes: {
      question: "Do they struggle with problem-solving or planning?",
      yes: {
        question: "Do they have trouble recognizing familiar people or places?",
        yes: {
          question: "Are they experiencing significant personality changes?",
          yes: {
            question: "Have they been evaluated by a doctor for Alzheimer's?",
            yes: "Seek specialist evaluation for accurate diagnosis.",
            no: "Consult a doctor for further cognitive tests.",
          },
          no: {
            question: "Are they struggling with language, like forgetting words?",
            yes: "Possible cognitive impairment. Seek medical advice.",
            no: "Monitor symptoms and track any progression.",
          },
        },
        no: {
          question: "Are they experiencing memory loss that disrupts daily life?",
          yes: "Early signs of dementia. Consult a professional.",
          no: "Mild forgetfulness. Likely normal aging.",
        },
      },
      no: {
        question: "Do they have difficulty completing familiar tasks?",
        yes: "Possible early signs of Alzheimer's. Seek evaluation.",
        no: "Mild cognitive changes. Keep monitoring.",
      },
    },
    no: {
      question: "Do they have occasional forgetfulness but remember later?",
      yes: "Likely normal aging. Keep a healthy lifestyle.",
      no: "Monitor any changes and consult a doctor if worsening.",
    },
  };

  getTree() {
    return this.tree;
  }
} 