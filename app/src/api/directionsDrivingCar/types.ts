export type GetDirectionsDrivingCarApiGetParams = {
  start: [number, number];
  end: [number, number];
};
export type GetDirectionsDrivingCarApiGetSuccess = {
  features: {
    properties: {
      summary: {
        distance: number;
        duration: number;
      };
    };
  }[];
};
