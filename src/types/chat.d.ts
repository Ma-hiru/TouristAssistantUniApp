export type chat<T extends "user" | "assistant" | "system"> = {
  id: T extends "assistant" | "system" ? number : undefined;
  userId: number;
  content: string;
  type: T;
  time: string;
  isAdd: boolean;
};

export type chatList = chat<"user" | "assistant" | "system">[];
