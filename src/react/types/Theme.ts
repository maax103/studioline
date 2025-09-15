export interface CustomTheme {
  colors: {
    primary: string[];
    secondary: string[];
    neutral: string[];
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: Record<string, number>;
  breakpoints: Record<string, string>;
}

export interface ThemeColors {
  sage: string; // #abc6ab
  blush: string; // #eaa5a0
  white: string;
  black: string;
  gray: string[];
}
