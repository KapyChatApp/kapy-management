export interface CountAnalyseResponseDTO {
  authHistory?: {
    totalPhone: string;
    totalBrowser: string;
  };
  message?: {
    totalMessage: string;
  };
  user?: {
    totalUser: string;
    gender: {
      male: string;
      female: string;
    };
    age: {
      lt18: string;
      gte18lte50: string;
      gt50: string;
    };
  };
}
