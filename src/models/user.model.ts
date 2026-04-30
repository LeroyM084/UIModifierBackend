export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date | null;
};

export type CreateUserInput = {
  username: string;
  email: string;
  password: string;
};

