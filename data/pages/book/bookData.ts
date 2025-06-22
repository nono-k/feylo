import type { BookType } from './bookType';
import { bookHtmlCss } from './bookHtmlCss';
import { bookJavascript } from './bookJavascript';
import { bookProgramming } from './bookProgramming';
import { bookMath } from './bookMath';
import { bookDesign } from './bookDesign';

export type BookData = {
  htmlCss: BookType[];
  javascript: BookType[];
  programming: BookType[];
  math: BookType[];
  design: BookType[];
};

export const bookData: BookData = {
  htmlCss: bookHtmlCss,
  javascript: bookJavascript,
  programming: bookProgramming,
  math: bookMath,
  design: bookDesign,
};
