import Axios from "axios";
import { Credentials } from "../types";
import { Proposal } from "@/modules/types";

/**
 * Authentication service.
 */
export default class AdminProposalsService {
  public async create(proposal: Proposal): Promise<Proposal> {
    return (await Axios.post("/proposals/create", proposal)).data;
  }

  public async fetch(): Promise<Proposal[]> {
    return (await Axios.get("/proposals/")).data;
  }
}
