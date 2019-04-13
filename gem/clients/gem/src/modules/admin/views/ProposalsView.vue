<template>
  <v-container fluid>
    <v-layout column>
      <v-btn
        block
        outline
        color="info"
        @click="onCreateClicked"
        data-ref="create-new-user"
      >
        <v-icon dark>add</v-icon>
        Create</v-btn
      >

      <v-data-table
        :headers="headers"
        :items="proposals"
        class="elevation-1"
        data-ref="proposals-table"
      >
        <template v-slot:items="props">
          <td @click="onProposalClicked(props.item)">
            {{ props.item.title }}
          </td>
          <td>{{ props.item.content }}</td>
        </template>
      </v-data-table>

      <edit-proposal-dialog
        :visible="isEditDialogVisible"
        :proposal="editingProposal"
        @close="onCloseEditDialogClicked"
        @save="onSaveClicked"
      />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EditProposalDialog from "../components/EditProposalDialog.vue";
import { AdminProposals } from "../store/proposals";
import { Proposal } from "@/modules/types";
import { EmptyProposal } from "../../types";

@Component({
  components: { EditProposalDialog }
})
export default class AdminProposalView extends Vue {
  private headers = [
    { text: "Title", value: "title" },
    { text: "Content", value: "content" }
  ];

  /** On create new proposal button clicked. */
  private onCreateClicked() {
    AdminProposals.openEditDialog({ ...EmptyProposal });
  }

  /** On proposal selected in a table. */
  private onProposalClicked(user: Proposal) {
    AdminProposals.openEditDialog(user);
  }

  /** On dialog closed. */
  private onCloseEditDialogClicked() {
    AdminProposals.closeEditDialog();
  }

  /** On save proposal clicked */
  private async onSaveClicked(data: Proposal) {
    await AdminProposals.save(data);
    AdminProposals.closeEditDialog();
  }

  /** Show edit dialog or not? */
  private get isEditDialogVisible(): boolean {
    return AdminProposals.isEditDialogVisible;
  }

  /** Editing dialog data. */
  private get editingProposal(): Proposal {
    return AdminProposals.editingProposal;
  }

  /** List of users. */
  private get proposals(): Proposal[] {
    return AdminProposals.proposals;
  }

  mounted() {
    AdminProposals.fetch();
  }
}
</script>
