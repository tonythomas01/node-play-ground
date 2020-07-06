export interface IRoom {
  _id: string;
  name: string;
  address: {
    title: string;
    placeId: string;
    location: {
      type: string;
      coordinates: [number];
    };
  };
  isPublic: boolean;
  code: number;
}
export interface IRoomInputDTO {
  name: string;
  address: {
    title: string;
    placeId: string;
    location: {
      type: string;
      coordinates: [number];
    };
  };
  isPublic: boolean;
  owner: string;
}
