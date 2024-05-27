export interface Option {
    text: string;
    description: string;
    type?: 'true' | 'false';
    hideText?: 'true' | 'false';
    svg?: string; // URL or base64 string for the SVG
  }
  
  export interface Question {
    id: number | string;
    type: 'single-choice' | 'multi-choice';
    question: string;
    subtitle: string;
    options: Option[];
    next: { [key: string]: number | string };
  }