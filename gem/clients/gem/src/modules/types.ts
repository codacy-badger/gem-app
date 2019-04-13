/** User */
export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  disabled: boolean;
}

/** Proposal */
export interface Proposal {
  id: number;
  title: string;
  content: string;
}

export const EmptyProposal: Proposal = {
  id: 0,
  title: "",
  content: ""
};

/** Anonymous user */
export const AnonymousUser: User = {
  id: -1,
  username: "Anonymous",
  email: "anonymous@mail.com",
  full_name: "Anonymous",
  disabled: false
};
