<template>
  <edit-dialog title="Edit user" :visible="visible" @close="close" @save="save">
    <v-flex xs12>
      <v-text-field
        v-model="proposal.title"
        label="Tile"
        required
        ref="title"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        v-model="proposal.content"
        label="Content"
        ref="content"
        required
      ></v-text-field>
    </v-flex>
  </edit-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Model } from "vue-property-decorator";
import { Proposal } from "../../types";
import EditDialog from "./EditDialog.vue";

@Component({ components: { EditDialog } })
export default class EditProposalDialog extends Vue {
  @Prop() public readonly proposal!: Proposal;
  @Prop({ default: false }) visible: boolean;

  @Emit("close") close() {
    return;
  }
  @Emit("save") save() {
    return this.proposal;
  }
}
</script>
