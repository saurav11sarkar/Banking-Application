interface IAccountLimit {
  saving: number;
  current: number;
}
interface ICardType {
  basic: {
    max: number;
    min: number;
  };
  classic: {
    max: number;
    min: number;
  };
  platinum: {
    max: number;
    min: number;
  };
}

export const Account_LIMIT: IAccountLimit = {
  saving: 0,
  current: 10,
};
export const CARD_TYPE: ICardType = {
  basic: {
    max: 10,
    min: 0,
  },
  classic: {
    max: 100,
    min: 0,
  },
  platinum: {
    max: 1000,
    min: 0,
  },
};
