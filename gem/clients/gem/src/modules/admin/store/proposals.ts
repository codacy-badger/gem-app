import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import { Proposal, EmptyProposal } from "@/modules/types";
import AdminProposalsService from "../services/proposals";

/** Import service to perform requests if required. */
const service = new AdminProposalsService();

/** Dummy storage module */
@Module({ namespaced: true, dynamic: true, name: "admin/proposals", store })
export default class AdminProposalsModule extends VuexModule {
  /** Implement store state here. */
  isEditDialogVisible: boolean = false;
  editingProposal: Proposal = EmptyProposal;
  proposals: Proposal[] = [];

  /** Implement store actions here */

  @Mutation openEditDialog(proposal: Proposal): void {
    // make a copy. do not mutate original one
    // original one should be mutated if user press save button
    this.editingProposal = { ...proposal };
    this.isEditDialogVisible = true;
  }

  @Mutation closeEditDialog(): void {
    this.isEditDialogVisible = false;
  }

  @Action async fetch() {
    const data = await service.fetch();
    this.proposalsFetched(data);
  }

  @Action async save(proposal: Proposal): Promise<Proposal> {
    if (proposal.id && proposal.id > 0) {
      this.proposalUpdated(proposal);
    } else {
      const res = await service.create(proposal);
      this.proposalCreated(res);
    }
    return proposal;
  }

  @Mutation private proposalCreated(proposal: Proposal) {
    proposal.id = this.proposals.length + 1;
    this.proposals.push(proposal);
  }

  @Mutation private proposalUpdated(proposal: Proposal) {
    const original = this.proposals.find(x => x.id === proposal.id);
    Object.assign(original, proposal);
  }

  @Mutation proposalsFetched(data: Proposal[]) {
    this.proposals = data;
  }
}

export const AdminProposals = getModule(AdminProposalsModule);
