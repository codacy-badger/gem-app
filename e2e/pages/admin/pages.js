const I = actor();

module.exports = {
  proposalsTable: "[data-ref='proposals-table']",
  createButton: "[data-ref='create-new-proposal']",
  editDialog: "[data-ref='edit-proposal-dialog']",
  titleInput: "[aria-label='Name']",
  contentInput: "[aria-label='Content']",
  saveProposalButton: "[data-ref='save-proposal']",

  submitDialog(title, content) {
    I.fillField(this.titleInput, name);
    I.fillField(this.contentInput, content);
    I.click(this.saveProposalButton);
  }
};
